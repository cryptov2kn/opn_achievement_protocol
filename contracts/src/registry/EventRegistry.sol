// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./IssuerRegistry.sol";

contract EventRegistry {
    // 1. enum
    enum EventStatus {
        Draft,
        Published,
        Archived
    }

    // 2. struct
    struct Event {
        uint256 id;
        address issuer;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        string metadataURI;
        EventStatus status;
    }

    // 3. state variables
    uint256 public nextEventId;

    mapping(uint256 => Event) public events;

    IssuerRegistry public issuerRegistry;

    // 4. constructor
    constructor(address _issuerRegistry) {
        issuerRegistry = IssuerRegistry(_issuerRegistry);
    }

    // 5. modifiers
    modifier onlyApprovedIssuer() {
        require(
            issuerRegistry.isApprovedIssuer(msg.sender),
            "Not approved issuer"
        );
        _;
    }

    // 6. events
    event EventCreated(uint256 indexed eventId, address indexed issuer);

    event EventUpdated(uint256 indexed eventId);

    event EventPublished(uint256 indexed eventId);

    event EventArchived(uint256 indexed eventId);

    //7. function
    function createEvent(
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime,
        string memory _metadataURI
    ) external onlyApprovedIssuer {
        require(bytes(_title).length > 0, "Empty title");

        require(_endTime > _startTime, "Invalid time");

        uint256 eventId = nextEventId;

        events[eventId] = Event({
            id: eventId,
            issuer: msg.sender,
            title: _title,
            description: _description,
            startTime: _startTime,
            endTime: _endTime,
            metadataURI: _metadataURI,
            status: EventStatus.Draft
        });

        nextEventId++;

        emit EventCreated(eventId, msg.sender);
    }

    function updateEvent(
        uint256 _eventId,
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime,
        string memory _metadataURI
    ) external {
        Event storage eventData = events[_eventId];

        require(eventData.issuer == msg.sender, "Not event owner");

        require(eventData.status == EventStatus.Draft, "Event locked");

        require(_endTime > _startTime, "Invalid time");

        eventData.title = _title;
        eventData.description = _description;
        eventData.startTime = _startTime;
        eventData.endTime = _endTime;
        eventData.metadataURI = _metadataURI;

        emit EventUpdated(_eventId);
    }

    function publishEvent(uint256 _eventId) external {
        Event storage eventData = events[_eventId];

        require(eventData.issuer == msg.sender, "Not event owner");

        require(eventData.status == EventStatus.Draft, "Already published");

        eventData.status = EventStatus.Published;

        emit EventPublished(_eventId);
    }

    function archiveEvent(uint256 _eventId) external {
        Event storage eventData = events[_eventId];

        require(eventData.issuer == msg.sender, "Not event owner");

        require(eventData.status == EventStatus.Published, "Invalid status");

        eventData.status = EventStatus.Archived;

        emit EventArchived(_eventId);
    }

    function getEventIssuer(uint256 eventId) external view returns (address) {
        return events[eventId].issuer;
    }

    function isPublished(uint256 eventId) external view returns (bool) {
        return events[eventId].status == EventStatus.Published;
    }

    function getEvent(uint256 id) external view returns (Event memory) {
        return events[id];
    }
}
