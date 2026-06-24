// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IssuerRegistry.sol";
import "./EventRegistry.sol";

contract AchievementRegistry {
    enum AchievementStatus {
        Draft,
        Published,
        Archived
    }

    struct Achievement {
        uint256 id;
        uint256 eventId;
        address issuer;
        string name;
        string description;
        string metadataURI;
        AchievementStatus status;
    }

    uint256 public nextAchievementId;

    mapping(uint256 => Achievement) public achievements;

    mapping(uint256 => uint256[]) public eventAchievements;

    IssuerRegistry public issuerRegistry;

    EventRegistry public eventRegistry;

    constructor(address _issuerRegistry, address _eventRegistry) {
        issuerRegistry = IssuerRegistry(_issuerRegistry);

        eventRegistry = EventRegistry(_eventRegistry);
    }

    modifier onlyApprovedIssuer() {
        require(
            issuerRegistry.isApprovedIssuer(msg.sender),
            "Not approved issuer"
        );
        _;
    }

    event AchievementCreated(
        uint256 indexed achievementId,
        uint256 indexed eventId,
        address indexed issuer
    );

    event AchievementUpdated(uint256 indexed achievementId);

    event AchievementPublished(uint256 indexed achievementId);

    event AchievementArchived(uint256 indexed achievementId);

    function createAchievement(
        uint256 _eventId,
        string memory _name,
        string memory _description,
        string memory _metadataURI
    ) external onlyApprovedIssuer {
        require(bytes(_name).length > 0, "Empty name");

        require(
            eventRegistry.getEventIssuer(_eventId) == msg.sender,
            "Not event owner"
        );

        require(eventRegistry.isPublished(_eventId), "Event not published");

        uint256 achievementId = nextAchievementId;

        achievements[achievementId] = Achievement({
            id: achievementId,
            eventId: _eventId,
            issuer: msg.sender,
            name: _name,
            description: _description,
            metadataURI: _metadataURI,
            status: AchievementStatus.Draft
        });

        eventAchievements[_eventId].push(achievementId);

        nextAchievementId++;

        emit AchievementCreated(achievementId, _eventId, msg.sender);
    }

    function updateAchievement(
        uint256 _achievementId,
        string memory _name,
        string memory _description,
        string memory _metadataURI
    ) external {
        Achievement storage achievement = achievements[_achievementId];

        require(achievement.issuer == msg.sender, "Not owner");

        require(
            achievement.status == AchievementStatus.Draft,
            "Achievement locked"
        );

        require(bytes(_name).length > 0, "Empty name");

        achievement.name = _name;

        achievement.description = _description;

        achievement.metadataURI = _metadataURI;

        emit AchievementUpdated(_achievementId);
    }

    function publishAchievement(uint256 _achievementId) external {
        Achievement storage achievement = achievements[_achievementId];

        require(achievement.issuer == msg.sender, "Not owner");

        require(
            achievement.status == AchievementStatus.Draft,
            "Already published"
        );

        achievement.status = AchievementStatus.Published;

        emit AchievementPublished(_achievementId);
    }

    function archiveAchievement(uint256 _achievementId) external {
        Achievement storage achievement = achievements[_achievementId];

        require(achievement.issuer == msg.sender, "Not owner");

        require(
            achievement.status == AchievementStatus.Published,
            "Invalid status"
        );

        achievement.status = AchievementStatus.Archived;

        emit AchievementArchived(_achievementId);
    }

    function getEventAchievements(
        uint256 _eventId
    ) external view returns (uint256[] memory) {
        return eventAchievements[_eventId];
    }

    function getAchievementIssuer(
        uint256 achievementId
    ) external view returns (address) {
        return achievements[achievementId].issuer;
    }

    function isPublished(uint256 achievementId) external view returns (bool) {
        return
            achievements[achievementId].status == AchievementStatus.Published;
    }

    function isArchived(uint256 achievementId) external view returns (bool) {
        return achievements[achievementId].status == AchievementStatus.Archived;
    }

    function getMetadataURI(
        uint256 achievementId
    ) external view returns (string memory) {
        return achievements[achievementId].metadataURI;
    }

    function getAchievement(
        uint256 id
    ) external view returns (Achievement memory) {
        return achievements[id];
    }
}
