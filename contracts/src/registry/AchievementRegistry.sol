// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IssuerRegistry.sol";

contract AchievementRegistry {
    struct Achievement {
        uint256 id;
        address issuer;
        string title;
        string description;
        string metadataURI;
        uint256 expirationDate;

        // Management overlay.
        // LIVE / END are derived from expirationDate.
        bool archived;

        // Destructive state.
        bool deleted;
    }

    uint256 public nextAchievementId;

    mapping(uint256 => Achievement) public achievements;

    /// @notice Issuer => achievement IDs created by that issuer.
    mapping(address => uint256[]) private issuerAchievements;

    IssuerRegistry public immutable issuerRegistry;

    event AchievementCreated(
        uint256 indexed achievementId,
        address indexed issuer
    );

    event AchievementUpdated(
        uint256 indexed achievementId
    );

    event AchievementArchived(
        uint256 indexed achievementId
    );

    event AchievementRestored(
        uint256 indexed achievementId
    );

    event AchievementDeleted(
        uint256 indexed achievementId
    );

    constructor(
        address _issuerRegistry
    ) {
        require(
            _issuerRegistry != address(0),
            "Invalid issuer registry"
        );

        issuerRegistry = IssuerRegistry(
            _issuerRegistry
        );
    }

    // =============================================================
    // Modifiers
    // =============================================================

    modifier onlyIssuer() {
        require(
            issuerRegistry.isIssuer(msg.sender),
            "Not an issuer"
        );
        _;
    }

    modifier achievementExists(
        uint256 achievementId
    ) {
        require(
            achievements[achievementId].issuer != address(0),
            "Achievement not found"
        );
        _;
    }

    modifier achievementOwner(
        uint256 achievementId
    ) {
        require(
            achievements[achievementId].issuer == msg.sender,
            "Not achievement owner"
        );
        _;
    }

    // =============================================================
    // Create
    // =============================================================

    /**
     * @notice Create a new achievement definition.
     *
     * No Draft state exists.
     * The achievement becomes immediately usable according
     * to its expirationDate / archive state.
     *
     * Points are NOT stored here.
     * Points belong to Event.
     */
    function createAchievement(
        string calldata title,
        string calldata description,
        string calldata metadataURI,
        uint256 expirationDate
    )
        external
        onlyIssuer
    {
        require(
            bytes(title).length > 0,
            "Empty title"
        );

        uint256 achievementId =
            nextAchievementId;

        achievements[achievementId] = Achievement({
            id: achievementId,
            issuer: msg.sender,
            title: title,
            description: description,
            metadataURI: metadataURI,
            expirationDate: expirationDate,
            archived: false,
            deleted: false
        });

        issuerAchievements[msg.sender].push(
            achievementId
        );

        nextAchievementId++;

        emit AchievementCreated(
            achievementId,
            msg.sender
        );
    }

    // =============================================================
    // Edit
    // =============================================================

    /**
     * @notice Edit an achievement.
     *
     * Allowed while LIVE or END.
     * Archived achievements must be restored first.
     *
     * Changing expirationDate can make:
     * END -> LIVE
     * or
     * LIVE -> END
     *
     * This does not modify existing Events.
     */
    function updateAchievement(
        uint256 achievementId,
        string calldata title,
        string calldata description,
        string calldata metadataURI,
        uint256 expirationDate
    )
        external
        achievementExists(achievementId)
        achievementOwner(achievementId)
    {
        Achievement storage achievement =
            achievements[achievementId];

        require(
            !achievement.deleted,
            "Achievement deleted"
        );

        require(
            !achievement.archived,
            "Achievement archived"
        );

        require(
            bytes(title).length > 0,
            "Empty title"
        );

        achievement.title = title;
        achievement.description = description;
        achievement.metadataURI = metadataURI;
        achievement.expirationDate = expirationDate;

        emit AchievementUpdated(
            achievementId
        );
    }

    // =============================================================
    // Archive
    // =============================================================

    /**
     * @notice Archive an achievement.
     *
     * Archive does not change any entity data.
     *
     * It can be called while the achievement is:
     * - LIVE
     * - END
     */
    function archiveAchievement(
        uint256 achievementId
    )
        external
        achievementExists(achievementId)
        achievementOwner(achievementId)
    {
        Achievement storage achievement =
            achievements[achievementId];

        require(
            !achievement.deleted,
            "Achievement deleted"
        );

        require(
            !achievement.archived,
            "Already archived"
        );

        achievement.archived = true;

        emit AchievementArchived(
            achievementId
        );
    }

    // =============================================================
    // Restore
    // =============================================================

    /**
     * @notice Restore an archived achievement.
     *
     * Only removes the archived overlay.
     *
     * LIVE / END is derived again from expirationDate.
     */
    function restoreAchievement(
        uint256 achievementId
    )
        external
        achievementExists(achievementId)
        achievementOwner(achievementId)
    {
        Achievement storage achievement =
            achievements[achievementId];

        require(
            !achievement.deleted,
            "Achievement deleted"
        );

        require(
            achievement.archived,
            "Not archived"
        );

        achievement.archived = false;

        emit AchievementRestored(
            achievementId
        );
    }

    // =============================================================
    // Delete
    // =============================================================

    /**
     * @notice Delete an achievement.
     *
     * This is a destructive validity state.
     *
     * Related Events are NOT physically iterated/deleted here.
     * SQL/indexer is responsible for removing related public
     * records according to the application architecture.
     *
     * Existing Credentials/SBTs remain valid historical records.
     */
    function deleteAchievement(
        uint256 achievementId
    )
        external
        achievementExists(achievementId)
        achievementOwner(achievementId)
    {
        Achievement storage achievement =
            achievements[achievementId];

        require(
            !achievement.deleted,
            "Achievement already deleted"
        );

        achievement.deleted = true;

        emit AchievementDeleted(
            achievementId
        );
    }

    // =============================================================
    // Derived state helpers
    // =============================================================

    /**
     * @notice LIVE means:
     * - exists
     * - not deleted
     * - not archived
     * - current time before expiration
     */
    function isLive(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (bool)
    {
        Achievement storage achievement =
            achievements[achievementId];

        return (
            !achievement.deleted &&
            !achievement.archived &&
            block.timestamp < achievement.expirationDate
        );
    }

    /**
     * @notice END means:
     * - exists
     * - not deleted
     * - not archived
     * - expiration reached
     */
    function isEnded(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (bool)
    {
        Achievement storage achievement =
            achievements[achievementId];

        return (
            !achievement.deleted &&
            !achievement.archived &&
            block.timestamp >= achievement.expirationDate
        );
    }

    /**
     * @notice ARCHIVED management state.
     */
    function isArchived(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (bool)
    {
        return achievements[achievementId].archived;
    }

    /**
     * @notice Whether achievement is deleted.
     */
    function isDeleted(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (bool)
    {
        return achievements[achievementId].deleted;
    }

    /**
     * @notice Whether the achievement can currently create a NEW Event.
     *
     * This is intentionally stricter than merely "exists".
     *
     * Achievement must be:
     * - not deleted
     * - not archived
     * - LIVE
     *
     * Achievement expiration does NOT affect existing Events.
     */
    function isValidForEventCreation(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (bool)
    {
        Achievement storage achievement =
            achievements[achievementId];

        return (
            !achievement.deleted &&
            !achievement.archived &&
            block.timestamp < achievement.expirationDate
        );
    }

    /**
     * @notice Verify that an achievement belongs to a given issuer.
     */
    function isAchievementOwner(
        uint256 achievementId,
        address issuer
    )
        external
        view
        achievementExists(achievementId)
        returns (bool)
    {
        return (
            achievements[achievementId].issuer == issuer
        );
    }

    // =============================================================
    // Getters
    // =============================================================

    function getAchievement(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (Achievement memory)
    {
        return achievements[achievementId];
    }

    function getAchievementIssuer(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (address)
    {
        return achievements[achievementId].issuer;
    }

    function getAchievementMetadataURI(
        uint256 achievementId
    )
        external
        view
        achievementExists(achievementId)
        returns (string memory)
    {
        return achievements[achievementId].metadataURI;
    }

    function getIssuerAchievements(
        address issuer
    )
        external
        view
        returns (uint256[] memory)
    {
        return issuerAchievements[issuer];
    }
}