// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {AccessControlManager} from "../src/access/AccessControlManager.sol";
import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";
import {EventRegistry} from "../src/registry/EventRegistry.sol";

contract EventRegistryTest is Test {
    AccessControlManager accessManager;
    IssuerRegistry issuerRegistry;
    EventRegistry eventRegistry;

    address admin = address(1);
    address issuer = address(2);
    address user = address(3);

    function setUp() public {
        vm.prank(admin);
        accessManager = new AccessControlManager(admin);

        issuerRegistry = new IssuerRegistry(address(accessManager));

        eventRegistry = new EventRegistry(address(issuerRegistry));

        // issuer đăng ký
        vm.prank(issuer);
        issuerRegistry.registerIssuer("OPN Foundation", "ipfs://issuer");

        // admin duyệt
        vm.prank(admin);
        issuerRegistry.approveIssuer(issuer);
    }

    //Test 1 - Create Event
    function testCreateEvent() public {
        vm.prank(issuer);

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );

        (uint256 id, address eventIssuer, , , , , , ) = eventRegistry.events(0);

        assertEq(id, 0);
        assertEq(eventIssuer, issuer);
    }

    //Test 2 - Non issuer cannot create
    function testNonIssuerCannotCreate() public {
        vm.prank(user);

        vm.expectRevert("Not approved issuer");

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );
    }

    //Test 3 - Publish Event
    function testPublishEvent() public {
        vm.prank(issuer);

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );

        vm.prank(issuer);

        eventRegistry.publishEvent(0);

        (, , , , , , , EventRegistry.EventStatus status) = eventRegistry.events(
            0
        );

        assertEq(uint256(status), uint256(EventRegistry.EventStatus.Published));
    }

    //Test 4 - Archive Event
    function testArchiveEvent() public {
        vm.startPrank(issuer);

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );

        eventRegistry.publishEvent(0);

        eventRegistry.archiveEvent(0);

        vm.stopPrank();

        (, , , , , , , EventRegistry.EventStatus status) = eventRegistry.events(
            0
        );

        assertEq(uint256(status), uint256(EventRegistry.EventStatus.Archived));
    }

    //Test 5 - Cannot update after publish
    function testCannotUpdateAfterPublish() public {
        vm.startPrank(issuer);

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );

        eventRegistry.publishEvent(0);

        vm.expectRevert("Event locked");

        eventRegistry.updateEvent(
            0,
            "New Title",
            "New Desc",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://new"
        );

        vm.stopPrank();
    }
}
