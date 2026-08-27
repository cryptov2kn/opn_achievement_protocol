// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IssuerRegistry.sol";
import "./AchievementRegistry.sol";

contract EventRegistry {
    struct Event {
        uint256 id;
        address issuer;
        uint256 achievementId;

        string title;
        string description;

        string eventType;
        string location;

        uint256 startTime;
        uint256 endTime;

        uint256 points;

        // Destructive validity state.
        bool deleted;
    }

    uint256 public nextEventId;

    mapping(uint256 => Event) public events;

    /// @notice Issuer => event IDs created by issuer.
    mapping(address => uint256[]) private issuerEvents;

    /// @notice Achievement => event IDs created for that achievement.
    mapping(uint256 => uint256[]) private achievementEvents;

    IssuerRegistry public immutable issuerRegistry;

    AchievementRegistry public immutable achievementRegistry;

    event EventCreated(
        uint256 indexed eventId,
        uint256 indexed achievementId,
        address indexed issuer
    );

    event EventUpdated(
        uint256 indexed eventId
    );

    event EventDeleted(
        uint256 indexed eventId
    );

    constructor(
        address _issuerRegistry,
        address _achievementRegistry
    ) {
        require(
            _issuerRegistry != address(0),
            "Invalid issuer registry"
        );

        require(
            _achievementRegistry != address(0),
            "Invalid achievement registry"
        );

        issuerRegistry = IssuerRegistry(
            _issuerRegistry
        );

        achievementRegistry = AchievementRegistry(
            _achievementRegistry
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

    modifier eventExists(
        uint256 eventId
    ) {
        require(
            events[eventId].issuer != address(0),
            "Event not found"
        );
        _;
    }

    modifier eventOwner(
        uint256 eventId
    ) {
        require(
            events[eventId].issuer == msg.sender,
            "Not event owner"
        );
        _;
    }

    // =============================================================
    // Create
    // =============================================================

    /**
     * @notice Create a new Event for an Achievement owned by msg.sender.
     *
     * Event is public immediately after creation.
     *
     * Conditions:
     * - caller is a registered issuer
     * - achievement exists
     * - achievement belongs to caller
     * - achievement is valid for NEW event creation
     *
     * No Draft state.
     * No Published state.
     * No Archive state.
     */
    function createEvent(
        uint256 achievementId,
        string calldata title,
        string calldata description,
        string calldata eventType,
        string calldata location,
        uint256 startTime,
        uint256 endTime,
        uint256 points
    )
        external
        onlyIssuer
    {
        require(
            achievementRegistry.isValidForEventCreation(
                achievementId
            ),
            "Achievement not valid"
        );

        require(
            achievementRegistry.isAchievementOwner(
                achievementId,
                msg.sender
            ),
            "Not achievement owner"
        );

        require(
            bytes(title).length > 0,
            "Empty title"
        );

        require(
            bytes(eventType).length > 0,
            "Empty event type"
        );

        require(
            bytes(location).length > 0,
            "Empty location"
        );

        require(
            endTime > startTime,
            "Invalid time"
        );

        uint256 eventId = nextEventId;

        events[eventId] = Event({
            id: eventId,
            issuer: msg.sender,
            achievementId: achievementId,
            title: title,
            description: description,
            eventType: eventType,
            location: location,
            startTime: startTime,
            endTime: endTime,
            points: points,
            deleted: false
        });

        issuerEvents[msg.sender].push(eventId);
        achievementEvents[achievementId].push(eventId);

        nextEventId++;

        emit EventCreated(
            eventId,
            achievementId,
            msg.sender
        );
    }

    // =============================================================
    // Edit
    // =============================================================

    /**
     * @notice Edit an existing Event.
     *
     * Edit is allowed regardless of:
     * - UPCOMING
     * - LIVE
     * - END
     *
     * The Achievement relationship is intentionally immutable here.
     * Existing Credentials must continue to refer to the same
     * Achievement/Event relationship.
     */
    function updateEvent(
        uint256 eventId,
        string calldata title,
        string calldata description,
        string calldata eventType,
        string calldata location,
        uint256 startTime,
        uint256 endTime,
        uint256 points
    )
        external
        eventExists(eventId)
        eventOwner(eventId)
    {
        Event storage eventData = events[eventId];

        require(
            !eventData.deleted,
            "Event deleted"
        );

        require(
            bytes(title).length > 0,
            "Empty title"
        );

        require(
            bytes(eventType).length > 0,
            "Empty event type"
        );

        require(
            bytes(location).length > 0,
            "Empty location"
        );

        require(
            endTime > startTime,
            "Invalid time"
        );

        eventData.title = title;
        eventData.description = description;
        eventData.eventType = eventType;
        eventData.location = location;
        eventData.startTime = startTime;
        eventData.endTime = endTime;
        eventData.points = points;

        emit EventUpdated(eventId);
    }

    // =============================================================
    // Delete
    // =============================================================

    /**
     * @notice Delete Event.
     *
     * The contract marks the Event as deleted.
     * SQL/indexer can remove it from public listings.
     *
     * Existing Credentials/SBTs are not burned by this action.
     */
    function deleteEvent(
        uint256 eventId
    )
        external
        eventExists(eventId)
        eventOwner(eventId)
    {
        Event storage eventData = events[eventId];

        require(
            !eventData.deleted,
            "Event already deleted"
        );

        eventData.deleted = true;

        emit EventDeleted(eventId);
    }

    // =============================================================
    // Derived timing state
    // =============================================================

    /**
     * @notice Event is UPCOMING when startTime is in the future.
     */
    function isUpcoming(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (bool)
    {
        Event storage eventData = events[eventId];

        return (
            !eventData.deleted &&
            block.timestamp < eventData.startTime
        );
    }

    /**
     * @notice Event is LIVE while:
     * startTime <= now < endTime
     */
    function isLive(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (bool)
    {
        Event storage eventData = events[eventId];

        return (
            !eventData.deleted &&
            block.timestamp >= eventData.startTime &&
            block.timestamp < eventData.endTime
        );
    }

    /**
     * @notice Event is END when now >= endTime.
     */
    function isEnded(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (bool)
    {
        Event storage eventData = events[eventId];

        return (
            !eventData.deleted &&
            block.timestamp >= eventData.endTime
        );
    }

    // =============================================================
    // Validation helpers
    // =============================================================

    /**
     * @notice Whether an Event exists and is not deleted.
     */
    function isValidEvent(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (bool)
    {
        return !events[eventId].deleted;
    }

    /**
     * @notice Whether an Event belongs to a specific issuer.
     */
    function isEventOwner(
        uint256 eventId,
        address issuer
    )
        external
        view
        eventExists(eventId)
        returns (bool)
    {
        return events[eventId].issuer == issuer;
    }

    // =============================================================
    // Getters
    // =============================================================

    function getEvent(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (Event memory)
    {
        return events[eventId];
    }

    function getEventIssuer(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (address)
    {
        return events[eventId].issuer;
    }

    function getEventAchievement(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (uint256)
    {
        return events[eventId].achievementId;
    }

    function getEventPoints(
        uint256 eventId
    )
        external
        view
        eventExists(eventId)
        returns (uint256)
    {
        return events[eventId].points;
    }

    function getIssuerEvents(
        address issuer
    )
        external
        view
        returns (uint256[] memory)
    {
        return issuerEvents[issuer];
    }

    function getAchievementEvents(
        uint256 achievementId
    )
        external
        view
        returns (uint256[] memory)
    {
        return achievementEvents[achievementId];
    }
}