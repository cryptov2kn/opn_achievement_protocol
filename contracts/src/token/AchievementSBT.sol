// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "../registry/AchievementRegistry.sol";

contract AchievementSBT is ERC721, Ownable {
    struct Credential {
        uint256 tokenId;
        uint256 achievementId;
        address recipient;
        bool active;
    }

    uint256 public nextTokenId;

    AchievementRegistry public achievementRegistry;

    mapping(uint256 => Credential) public credentials;

    mapping(address => uint256[]) public userCredentials;

    mapping(uint256 => mapping(address => bool)) public hasCredential;

    constructor(
        address _achievementRegistry
    ) ERC721("OPN Achievement", "OPNA") Ownable(msg.sender) {
        achievementRegistry = AchievementRegistry(_achievementRegistry);
    }

    event CredentialMinted(
        uint256 indexed tokenId,
        uint256 indexed achievementId,
        address indexed recipient
    );

    event CredentialRevoked(uint256 indexed tokenId);

    function mint(address _recipient, uint256 _achievementId) external {
        require(
            achievementRegistry.getAchievementIssuer(_achievementId) ==
                msg.sender,
            "Not issuer"
        );

        require(
            achievementRegistry.isPublished(_achievementId),
            "Achievement not published"
        );

        require(!hasCredential[_achievementId][_recipient], "Already claimed");

        uint256 tokenId = nextTokenId;

        _safeMint(_recipient, tokenId);

        credentials[tokenId] = Credential({
            tokenId: tokenId,
            achievementId: _achievementId,
            recipient: _recipient,
            active: true
        });

        userCredentials[_recipient].push(tokenId);

        hasCredential[_achievementId][_recipient] = true;

        nextTokenId++;

        emit CredentialMinted(tokenId, _achievementId, _recipient);
    }

    function revoke(uint256 _tokenId) external {
        Credential storage credential = credentials[_tokenId];

        require(credential.active, "Already revoked");

        require(
            achievementRegistry.getAchievementIssuer(
                credential.achievementId
            ) == msg.sender,
            "Not issuer"
        );

        credential.active = false;

        emit CredentialRevoked(_tokenId);
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);

        if (from != address(0) && to != address(0)) {
            revert("Soulbound");
        }

        return super._update(to, tokenId, auth);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return
            achievementRegistry.getMetadataURI(
                credentials[tokenId].achievementId
            );
    }

    function getUserCredentials(
        address user
    ) external view returns (uint256[] memory) {
        return userCredentials[user];
    }

    function getActiveCredentialCount(
        address user
    ) external view returns (uint256) {
        uint256[] memory ids = userCredentials[user];

        uint256 count;

        for (uint256 i; i < ids.length; i++) {
            if (credentials[ids[i]].active) {
                count++;
            }
        }

        return count;
    }

    function getActiveCredentials(
        address user
    ) external view returns (uint256[] memory) {
        uint256[] memory ids = userCredentials[user];

        uint256 activeCount;

        for (uint256 i; i < ids.length; i++) {
            if (credentials[ids[i]].active) {
                activeCount++;
            }
        }

        uint256[] memory result = new uint256[](activeCount);

        uint256 index;

        for (uint256 i; i < ids.length; i++) {
            if (credentials[ids[i]].active) {
                result[index] = ids[i];
                index++;
            }
        }

        return result;
    }

    function isCredentialActive(uint256 tokenId) external view returns (bool) {
        return credentials[tokenId].active;
    }
}
