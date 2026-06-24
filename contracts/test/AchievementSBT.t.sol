// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";

import {AccessControlManager} from "../src/access/AccessControlManager.sol";

import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";

import {EventRegistry} from "../src/registry/EventRegistry.sol";

import {AchievementRegistry} from "../src/registry/AchievementRegistry.sol";

import {AchievementSBT} from "../src/token/AchievementSBT.sol";

contract AchievementSBTTest is Test {
    AccessControlManager accessManager;
    IssuerRegistry issuerRegistry;
    EventRegistry eventRegistry;
    AchievementRegistry achievementRegistry;
    AchievementSBT achievementSBT;

    address admin = address(1);
    address issuer = address(2);
    address user = address(3);
    address user2 = address(4);

    function setUp() public {
        vm.prank(admin);
        accessManager = new AccessControlManager(admin);

        issuerRegistry = new IssuerRegistry(address(accessManager));

        eventRegistry = new EventRegistry(address(issuerRegistry));

        achievementRegistry = new AchievementRegistry(
            address(issuerRegistry),
            address(eventRegistry)
        );

        achievementSBT = new AchievementSBT(address(achievementRegistry));

        vm.prank(issuer);

        issuerRegistry.registerIssuer("OPN Foundation", "ipfs://issuer");

        vm.prank(admin);

        issuerRegistry.approveIssuer(issuer);

        vm.startPrank(issuer);

        eventRegistry.createEvent(
            "Builder Marathon",
            "Season 2",
            block.timestamp,
            block.timestamp + 7 days,
            "ipfs://event"
        );

        eventRegistry.publishEvent(0);

        achievementRegistry.createAchievement(
            0,
            "Participant",
            "Badge",
            "ipfs://achievement"
        );

        achievementRegistry.publishAchievement(0);

        vm.stopPrank();
    }

    //Test 1 - Mint
    function testMint() public {
        vm.prank(issuer);

        achievementSBT.mint(user, 0);

        assertEq(achievementSBT.ownerOf(0), user);
    }

    //Test 2 - Cannot mint twice
    function testCannotMintTwice() public {
        vm.startPrank(issuer);

        achievementSBT.mint(user, 0);

        vm.expectRevert("Already claimed");

        achievementSBT.mint(user, 0);

        vm.stopPrank();
    }

    //Test 3 - Revoke
    function testRevoke() public {
        vm.startPrank(issuer);

        achievementSBT.mint(user, 0);

        achievementSBT.revoke(0);

        vm.stopPrank();

        (, , , bool active) = achievementSBT.credentials(0);

        assertFalse(active);
    }

    //Test 4 - Soulbound
    function testSoulbound() public {
        vm.prank(issuer);

        achievementSBT.mint(user, 0);

        vm.prank(user);

        vm.expectRevert("Soulbound");

        achievementSBT.transferFrom(user, user2, 0);
    }

    //Test 5 - tokenURI
    function testTokenURI() public {
        vm.prank(issuer);

        achievementSBT.mint(user, 0);

        assertEq(achievementSBT.tokenURI(0), "ipfs://achievement");
    }

    //Test 6 - User Credentials
    function testUserCredentials() public {
        vm.prank(issuer);

        achievementSBT.mint(user, 0);

        uint256[] memory ids = achievementSBT.getUserCredentials(user);

        assertEq(ids.length, 1);

        assertEq(ids[0], 0);
    }
}
