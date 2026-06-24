// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";

import {AccessControlManager} from "../src/access/AccessControlManager.sol";

import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";

import {EventRegistry} from "../src/registry/EventRegistry.sol";

import {AchievementRegistry} from "../src/registry/AchievementRegistry.sol";

contract AchievementRegistryTest is Test {
    AccessControlManager accessManager;
    IssuerRegistry issuerRegistry;
    EventRegistry eventRegistry;
    AchievementRegistry achievementRegistry;

    address admin = address(1);
    address issuer = address(2);
    address user = address(3);

    function setUp() public {
        vm.prank(admin);
        accessManager = new AccessControlManager(admin);

        issuerRegistry = new IssuerRegistry(address(accessManager));

        eventRegistry = new EventRegistry(address(issuerRegistry));

        achievementRegistry = new AchievementRegistry(
            address(issuerRegistry),
            address(eventRegistry)
        );

        // đăng ký issuer
        vm.prank(issuer);
        issuerRegistry.registerIssuer("OPN Foundation", "ipfs://issuer");

        // admin duyệt
        vm.prank(admin);
        issuerRegistry.approveIssuer(issuer);

        // tạo event
        vm.startPrank(issuer);

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );

        // publish event
        eventRegistry.publishEvent(0);

        vm.stopPrank();
    }

    //Test 1 - Create Achievement
    function testCreateAchievement() public {
        vm.prank(issuer);

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Participation Badge",
            "ipfs://achievement"
        );

        (
            uint256 id,
            uint256 eventId,
            address achievementIssuer,
            ,
            ,
            ,

        ) = achievementRegistry.achievements(0);

        assertEq(id, 0);
        assertEq(eventId, 0);
        assertEq(achievementIssuer, issuer);
    }

    //Test 2 - Non issuer cannot create
    function testNonIssuerCannotCreate() public {
        vm.prank(user);

        vm.expectRevert("Not approved issuer");

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Badge",
            "ipfs://achievement"
        );
    }

    //Test 3 - Publish Achievement
    function testPublishAchievement() public {
        vm.startPrank(issuer);

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Badge",
            "ipfs://achievement"
        );

        achievementRegistry.publishAchievement(0);

        vm.stopPrank();

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AchievementRegistry.AchievementStatus status
        ) = achievementRegistry.achievements(0);

        assertEq(
            uint256(status),
            uint256(AchievementRegistry.AchievementStatus.Published)
        );
    }

    //Test 4 - Archive Achievement
    function testArchiveAchievement() public {
        vm.startPrank(issuer);

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Badge",
            "ipfs://achievement"
        );

        achievementRegistry.publishAchievement(0);

        achievementRegistry.archiveAchievement(0);

        vm.stopPrank();

        (
            ,
            ,
            ,
            ,
            ,
            ,
            AchievementRegistry.AchievementStatus status
        ) = achievementRegistry.achievements(0);

        assertEq(
            uint256(status),
            uint256(AchievementRegistry.AchievementStatus.Archived)
        );
    }

    //Test 5 - Cannot update after publish
    function testCannotUpdateAfterPublish() public {
        vm.startPrank(issuer);

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Badge",
            "ipfs://achievement"
        );

        achievementRegistry.publishAchievement(0);

        vm.expectRevert("Achievement locked");

        achievementRegistry.updateAchievement(
            0,
            "New Name",
            "New Desc",
            "ipfs://new"
        );

        vm.stopPrank();
    }

    //Test 6 - EventAchievements mapping
    function testEventAchievements() public {
        vm.prank(issuer);

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Badge",
            "ipfs://achievement"
        );

        uint256[] memory ids = achievementRegistry.getEventAchievements(0);

        assertEq(ids.length, 1);

        assertEq(ids[0], 0);
    }
}
