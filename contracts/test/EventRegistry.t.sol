// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";

import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";
import {AchievementRegistry} from "../src/registry/AchievementRegistry.sol";
import {EventRegistry} from "../src/registry/EventRegistry.sol";

contract EventRegistryTest is Test {
    IssuerRegistry issuerRegistry;
    AchievementRegistry achievementRegistry;
    EventRegistry eventRegistry;

    address issuer = address(0x100);
    address issuer2 = address(0x200);
    address user = address(0x300);

    uint256 achievementExpiration;

    function setUp() public {
        issuerRegistry = new IssuerRegistry();

        achievementRegistry =
            new AchievementRegistry(
                address(issuerRegistry)
            );

        eventRegistry =
            new EventRegistry(
                address(issuerRegistry),
                address(achievementRegistry)
            );

        vm.prank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://issuer"
        );

        vm.prank(issuer2);

        issuerRegistry.registerIssuer(
            "Another Issuer",
            "ipfs://issuer2"
        );

        achievementExpiration =
            block.timestamp + 30 days;

        vm.prank(issuer);

        achievementRegistry.createAchievement(
            "OPN Builder Marathon",
            "Builder achievement",
            "ipfs://achievement",
            achievementExpiration
        );
    }

    function createDefaultEvent()
        internal
    {
        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Builder Marathon Event",
            "Season 1 event",
            "online",
            "https://example.com/event",
            block.timestamp + 1 days,
            block.timestamp + 7 days,
            100
        );
    }

    // ---------------------------------------------------------
    // Create
    // ---------------------------------------------------------

    function testCreateEvent() public {
        createDefaultEvent();

        EventRegistry.Event memory eventData =
            eventRegistry.getEvent(0);

        assertEq(eventData.id, 0);
        assertEq(eventData.issuer, issuer);
        assertEq(eventData.achievementId, 0);
        assertEq(
            eventData.title,
            "Builder Marathon Event"
        );
        assertEq(
            eventData.points,
            100
        );
        assertFalse(eventData.deleted);
    }

    function testNonIssuerCannotCreateEvent()
        public
    {
        vm.prank(user);

        vm.expectRevert("Not an issuer");

        eventRegistry.createEvent(
            0,
            "Unauthorized Event",
            "Bad",
            "online",
            "https://example.com",
            block.timestamp + 1 days,
            block.timestamp + 7 days,
            100
        );
    }

    function testIssuerCannotCreateEventForAnotherIssuersAchievement()
        public
    {
        vm.prank(issuer2);

        vm.expectRevert("Not achievement owner");

        eventRegistry.createEvent(
            0,
            "Unauthorized",
            "Bad",
            "online",
            "https://example.com",
            block.timestamp + 1 days,
            block.timestamp + 7 days,
            100
        );
    }

    function testEndedAchievementCannotCreateEvent()
        public
    {
        vm.warp(achievementExpiration);

        vm.prank(issuer);

        vm.expectRevert("Achievement not valid");

        eventRegistry.createEvent(
            0,
            "Too Late",
            "Bad",
            "online",
            "https://example.com",
            block.timestamp + 1 days,
            block.timestamp + 7 days,
            100
        );
    }

    function testArchivedAchievementCannotCreateEvent()
        public
    {
        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        vm.prank(issuer);

        vm.expectRevert("Achievement not valid");

        eventRegistry.createEvent(
            0,
            "Archived Achievement Event",
            "Bad",
            "online",
            "https://example.com",
            block.timestamp + 1 days,
            block.timestamp + 7 days,
            100
        );
    }

    // ---------------------------------------------------------
    // Timing
    // ---------------------------------------------------------

    function testUpcomingEvent() public {
        createDefaultEvent();

        assertTrue(
            eventRegistry.isUpcoming(0)
        );

        assertFalse(
            eventRegistry.isLive(0)
        );

        assertFalse(
            eventRegistry.isEnded(0)
        );
    }

    function testLiveEvent() public {
        createDefaultEvent();

        vm.warp(
            block.timestamp + 2 days
        );

        assertFalse(
            eventRegistry.isUpcoming(0)
        );

        assertTrue(
            eventRegistry.isLive(0)
        );

        assertFalse(
            eventRegistry.isEnded(0)
        );
    }

    function testEndedEvent() public {
        createDefaultEvent();

        vm.warp(
            block.timestamp + 7 days
        );

        assertFalse(
            eventRegistry.isUpcoming(0)
        );

        assertFalse(
            eventRegistry.isLive(0)
        );

        assertTrue(
            eventRegistry.isEnded(0)
        );
    }

    // ---------------------------------------------------------
    // Edit
    // ---------------------------------------------------------

    function testUpdateUpcomingEvent() public {
        createDefaultEvent();

        vm.prank(issuer);

        eventRegistry.updateEvent(
            0,
            "Updated Upcoming",
            "Updated",
            "online",
            "https://new.example.com",
            block.timestamp + 2 days,
            block.timestamp + 8 days,
            200
        );

        EventRegistry.Event memory eventData =
            eventRegistry.getEvent(0);

        assertEq(
            eventData.title,
            "Updated Upcoming"
        );

        assertEq(
            eventData.points,
            200
        );
    }

    function testUpdateLiveEvent() public {
        createDefaultEvent();

        vm.warp(
            block.timestamp + 2 days
        );

        vm.prank(issuer);

        eventRegistry.updateEvent(
            0,
            "Updated Live",
            "Updated",
            "online",
            "https://live.example.com",
            block.timestamp - 1 days,
            block.timestamp + 2 days,
            300
        );

        EventRegistry.Event memory eventData =
            eventRegistry.getEvent(0);

        assertEq(
            eventData.title,
            "Updated Live"
        );

        assertEq(
            eventData.points,
            300
        );
    }

    function testUpdateEndedEvent() public {
        uint256 baseTime = block.timestamp;

        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Builder Event",
            "Builder Event",
            "online",
            "https://example.com",
            baseTime + 1 days,
            baseTime + 7 days,
            100
        );

        // Move after event end.
        vm.warp(baseTime + 8 days);

        assertTrue(
            eventRegistry.isEnded(0)
        );

        vm.prank(issuer);

        eventRegistry.updateEvent(
            0,
            "Updated Ended",
            "Updated",
            "online",
            "https://ended.example.com",
            baseTime + 9 days,
            baseTime + 15 days,
            400
        );

        EventRegistry.Event memory eventData =
            eventRegistry.getEvent(0);

        assertEq(
            eventData.title,
            "Updated Ended"
        );

        assertEq(
            eventData.points,
            400
        );

        assertEq(
            eventData.startTime,
            baseTime + 9 days
        );

        assertEq(
            eventData.endTime,
            baseTime + 15 days
        );
    }

    function testNonOwnerCannotUpdateEvent()
        public
    {
        createDefaultEvent();

        vm.prank(issuer2);

        vm.expectRevert("Not event owner");

        eventRegistry.updateEvent(
            0,
            "Hacked",
            "Hacked",
            "online",
            "https://hack.example.com",
            block.timestamp + 1 days,
            block.timestamp + 2 days,
            999
        );
    }

    // ---------------------------------------------------------
    // Achievement expiration independence
    // ---------------------------------------------------------

    function testAchievementExpirationDoesNotEndExistingEvent()
        public
    {
        uint256 baseTime = block.timestamp;

        uint256 eventStart = baseTime + 1 days;
        uint256 eventEnd = baseTime + 40 days;

        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Long Event",
            "Outlives Achievement",
            "online",
            "https://example.com",
            eventStart,
            eventEnd,
            100
        );

        // Achievement expires at baseTime + 30 days.
        vm.warp(baseTime + 30 days);

        assertTrue(
            achievementRegistry.isEnded(0)
        );

        assertFalse(
            eventRegistry.isEnded(0)
        );

        assertTrue(
            eventRegistry.isLive(0)
        );
    }

    // ---------------------------------------------------------
    // Points
    // ---------------------------------------------------------

    function testEventPointsAreIndependent()
        public
    {
        createDefaultEvent();

        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Event 2",
            "Different points",
            "online",
            "https://example2.com",
            block.timestamp + 2 days,
            block.timestamp + 8 days,
            250
        );

        assertEq(
            eventRegistry.getEventPoints(0),
            100
        );

        assertEq(
            eventRegistry.getEventPoints(1),
            250
        );
    }

    // ---------------------------------------------------------
    // Delete
    // ---------------------------------------------------------

    function testDeleteEvent() public {
        createDefaultEvent();

        vm.prank(issuer);

        eventRegistry.deleteEvent(0);

        EventRegistry.Event memory eventData =
            eventRegistry.getEvent(0);

        assertTrue(
            eventData.deleted
        );

        assertFalse(
            eventRegistry.isValidEvent(0)
        );
    }

    function testCannotDeleteEventTwice()
        public
    {
        createDefaultEvent();

        vm.startPrank(issuer);

        eventRegistry.deleteEvent(0);

        vm.expectRevert(
            "Event already deleted"
        );

        eventRegistry.deleteEvent(0);

        vm.stopPrank();
    }

    function testDeletedEventCannotBeUpdated()
        public
    {
        createDefaultEvent();

        vm.startPrank(issuer);

        eventRegistry.deleteEvent(0);

        vm.expectRevert(
            "Event deleted"
        );

        eventRegistry.updateEvent(
            0,
            "Should Fail",
            "Should Fail",
            "online",
            "https://fail.example.com",
            block.timestamp + 1 days,
            block.timestamp + 2 days,
            500
        );

        vm.stopPrank();
    }

    // ---------------------------------------------------------
    // Relationship
    // ---------------------------------------------------------

    function testAchievementEventsRelationship()
        public
    {
        createDefaultEvent();

        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Event 2",
            "Second Event",
            "offline",
            "District 1",
            block.timestamp + 2 days,
            block.timestamp + 9 days,
            200
        );

        uint256[] memory eventIds =
            eventRegistry.getAchievementEvents(0);

        assertEq(eventIds.length, 2);
        assertEq(eventIds[0], 0);
        assertEq(eventIds[1], 1);
    }
}