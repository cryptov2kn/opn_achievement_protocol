// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "../registry/AchievementRegistry.sol";
import "../registry/EventRegistry.sol";

contract AchievementSBT is ERC721 {
    struct Credential {
        uint256 tokenId;
        uint256 achievementId;
        uint256 eventId;
        address recipient;

        // Historical point snapshot at mint time.
        uint256 pointsSnapshot;

        bool active;
    }

    uint256 public nextTokenId;

    AchievementRegistry public immutable achievementRegistry;

    EventRegistry public immutable eventRegistry;

    mapping(uint256 => Credential) public credentials;

    /// @notice recipient => token IDs
    mapping(address => uint256[]) private userCredentials;

    /**
     * @notice Event ID => recipient => whether a credential
     * has already been issued.
     *
     * This enforces:
     * Event + User = unique
     */
    mapping(uint256 => mapping(address => bool))
        public hasCredential;

    event CredentialMinted(
        uint256 indexed tokenId,
        uint256 indexed achievementId,
        uint256 indexed eventId,
        address recipient,
        uint256 pointsSnapshot
    );

    event CredentialRevoked(
        uint256 indexed tokenId
    );

    constructor(
        address _achievementRegistry,
        address _eventRegistry
    )
        ERC721(
            "OPN Achievement",
            "OPNA"
        )
    {
        require(
            _achievementRegistry != address(0),
            "Invalid achievement registry"
        );

        require(
            _eventRegistry != address(0),
            "Invalid event registry"
        );

        achievementRegistry = AchievementRegistry(
            _achievementRegistry
        );

        eventRegistry = EventRegistry(
            _eventRegistry
        );
    }

    // =============================================================
    // Mint
    // =============================================================

    /**
     * @notice Mint a Credential/SBT for a recipient.
     *
     * Current architecture uses the Event issuer as the minting
     * authority. No role system is introduced.
     *
     * Required:
     * - Event exists and is not deleted
     * - Event belongs to msg.sender
     * - Event's achievement matches achievementId
     * - Achievement is valid
     * - recipient is not the event creator
     * - Event + recipient has not been claimed before
     *
     * The Event's current points are snapshotted at mint time.
     */
    function mint(
        address recipient,
        uint256 achievementId,
        uint256 eventId
    )
        external
    {
        require(
            recipient != address(0),
            "Invalid recipient"
        );

        require(
            eventRegistry.isValidEvent(eventId),
            "Event not valid"
        );

        require(
            eventRegistry.isEventOwner(
                eventId,
                msg.sender
            ),
            "Not event issuer"
        );

        uint256 linkedAchievementId =
            eventRegistry.getEventAchievement(
                eventId
            );

        require(
            linkedAchievementId == achievementId,
            "Achievement mismatch"
        );

        require(
            achievementRegistry.isAchievementOwner(
                achievementId,
                msg.sender
            ),
            "Not achievement owner"
        );

        require(
            !achievementRegistry.isDeleted(
                achievementId
            ),
            "Achievement deleted"
        );

        require(
            !achievementRegistry.isArchived(
                achievementId
            ),
            "Achievement archived"
        );

        /**
         * The event issuer cannot receive a credential from
         * their own event.
         *
         * This enforces the anti-self-farming invariant at the
         * credential layer even though Join/Complete itself lives
         * outside the core contracts.
         */
        require(
            recipient != msg.sender,
            "Issuer cannot receive own event credential"
        );

        require(
            !hasCredential[eventId][recipient],
            "Already claimed"
        );

        uint256 tokenId = nextTokenId;

        uint256 pointsSnapshot =
            eventRegistry.getEventPoints(
                eventId
            );

        _safeMint(
            recipient,
            tokenId
        );

        credentials[tokenId] = Credential({
            tokenId: tokenId,
            achievementId: achievementId,
            eventId: eventId,
            recipient: recipient,
            pointsSnapshot: pointsSnapshot,
            active: true
        });

        userCredentials[recipient].push(
            tokenId
        );

        hasCredential[eventId][recipient] = true;

        nextTokenId++;

        emit CredentialMinted(
            tokenId,
            achievementId,
            eventId,
            recipient,
            pointsSnapshot
        );
    }

    // =============================================================
    // Revoke
    // =============================================================

    /**
     * @notice Revoke an active Credential.
     *
     * Credential remains minted.
     * Token ownership remains unchanged.
     * Historical data remains unchanged.
     */
    function revoke(
        uint256 tokenId
    )
        external
    {
        require(
            _ownerOf(tokenId) != address(0),
            "Credential not found"
        );

        Credential storage credential =
            credentials[tokenId];

        require(
            credential.active,
            "Already revoked"
        );

        require(
            eventRegistry.isEventOwner(
                credential.eventId,
                msg.sender
            ),
            "Not event issuer"
        );

        credential.active = false;

        emit CredentialRevoked(
            tokenId
        );
    }

    // =============================================================
    // Soulbound
    // =============================================================

    /**
     * @notice Block all transfers between two non-zero addresses.
     *
     * Mint:
     * address(0) -> recipient   allowed
     *
     * Transfer:
     * recipient -> another user forbidden
     *
     * This contract does not implement a burn flow.
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    )
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);

        if (
            from != address(0) &&
            to != address(0)
        ) {
            revert("Soulbound");
        }

        return super._update(
            to,
            tokenId,
            auth
        );
    }

    // =============================================================
    // Metadata
    // =============================================================

    /**
     * @notice Use the Achievement metadata as the credential's
     * base token metadata.
     *
     * The Credential itself additionally stores Event and point
     * snapshot data on-chain.
     */
    function tokenURI(
        uint256 tokenId
    )
        public
        view
        override
        returns (string memory)
    {
        require(
            _ownerOf(tokenId) != address(0),
            "Credential not found"
        );

        return achievementRegistry
            .getAchievementMetadataURI(
                credentials[tokenId].achievementId
            );
    }

    // =============================================================
    // Credential getters
    // =============================================================

    function getCredential(
        uint256 tokenId
    )
        external
        view
        returns (Credential memory)
    {
        require(
            _ownerOf(tokenId) != address(0),
            "Credential not found"
        );

        return credentials[tokenId];
    }

    function getUserCredentials(
        address user
    )
        external
        view
        returns (uint256[] memory)
    {
        return userCredentials[user];
    }

    function isCredentialActive(
        uint256 tokenId
    )
        external
        view
        returns (bool)
    {
        require(
            _ownerOf(tokenId) != address(0),
            "Credential not found"
        );

        return credentials[tokenId].active;
    }

    function getPointSnapshot(
        uint256 tokenId
    )
        external
        view
        returns (uint256)
    {
        require(
            _ownerOf(tokenId) != address(0),
            "Credential not found"
        );

        return credentials[tokenId].pointsSnapshot;
    }

    function credentialExistsForEventRecipient(
        uint256 eventId,
        address recipient
    )
        external
        view
        returns (bool)
    {
        return hasCredential[eventId][recipient];
    }

    function getUserCredentialCount(
        address user
    )
        external
        view
        returns (uint256)
    {
        return userCredentials[user].length;
    }
}