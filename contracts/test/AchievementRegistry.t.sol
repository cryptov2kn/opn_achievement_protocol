// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";

import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";
import {AchievementRegistry} from "../src/registry/AchievementRegistry.sol";

contract AchievementRegistryTest is Test {
    IssuerRegistry issuerRegistry;
    AchievementRegistry achievementRegistry;

    address issuer = address(0x100);
    address user = address(0x200);

    uint256 expirationDate;

    function setUp() public {
        issuerRegistry = new IssuerRegistry();

        achievementRegistry =
            new AchievementRegistry(
                address(issuerRegistry)
            );

        vm.prank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://issuer"
        );

        expirationDate =
            block.timestamp + 30 days;
    }

    function createDefaultAchievement()
        internal
    {
        vm.prank(issuer);

        achievementRegistry.createAchievement(
            "OPN Builder Marathon",
            "Builder achievement",
            "ipfs://achievement",
            expirationDate
        );
    }

    // ---------------------------------------------------------
    // Create
    // ---------------------------------------------------------

    function testCreateAchievement() public {
        createDefaultAchievement();

        AchievementRegistry.Achievement memory achievement =
            achievementRegistry.getAchievement(0);

        assertEq(achievement.id, 0);
        assertEq(achievement.issuer, issuer);
        assertEq(
            achievement.title,
            "OPN Builder Marathon"
        );
        assertEq(
            achievement.description,
            "Builder achievement"
        );
        assertEq(
            achievement.metadataURI,
            "ipfs://achievement"
        );
        assertEq(
            achievement.expirationDate,
            expirationDate
        );

        assertFalse(achievement.archived);
        assertFalse(achievement.deleted);
    }

    function testNonIssuerCannotCreateAchievement()
        public
    {
        vm.prank(user);

        vm.expectRevert("Not an issuer");

        achievementRegistry.createAchievement(
            "Unauthorized",
            "Bad achievement",
            "ipfs://bad",
            expirationDate
        );
    }

    // ---------------------------------------------------------
    // LIVE / END
    // ---------------------------------------------------------

    function testAchievementIsLiveBeforeExpiration()
        public
    {
        createDefaultAchievement();

        assertTrue(
            achievementRegistry.isLive(0)
        );

        assertFalse(
            achievementRegistry.isEnded(0)
        );
    }

    function testAchievementEndsAtExpiration()
        public
    {
        createDefaultAchievement();

        vm.warp(expirationDate);

        assertFalse(
            achievementRegistry.isLive(0)
        );

        assertTrue(
            achievementRegistry.isEnded(0)
        );
    }

    // ---------------------------------------------------------
    // Edit
    // ---------------------------------------------------------

    function testUpdateAchievement() public {
        createDefaultAchievement();

        uint256 newExpiration =
            block.timestamp + 60 days;

        vm.prank(issuer);

        achievementRegistry.updateAchievement(
            0,
            "Updated Achievement",
            "Updated description",
            "ipfs://updated",
            newExpiration
        );

        AchievementRegistry.Achievement memory achievement =
            achievementRegistry.getAchievement(0);

        assertEq(
            achievement.title,
            "Updated Achievement"
        );

        assertEq(
            achievement.description,
            "Updated description"
        );

        assertEq(
            achievement.metadataURI,
            "ipfs://updated"
        );

        assertEq(
            achievement.expirationDate,
            newExpiration
        );
    }

    function testNonOwnerCannotUpdateAchievement()
        public
    {
        createDefaultAchievement();

        vm.prank(user);

        vm.expectRevert(
            "Not achievement owner"
        );

        achievementRegistry.updateAchievement(
            0,
            "Hacked",
            "Hacked",
            "ipfs://hack",
            block.timestamp + 10 days
        );
    }

    function testUpdateArchivedAchievementReverts()
        public
    {
        createDefaultAchievement();

        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        vm.prank(issuer);

        vm.expectRevert("Achievement archived");

        achievementRegistry.updateAchievement(
            0,
            "Should Fail",
            "Should Fail",
            "ipfs://fail",
            block.timestamp + 10 days
        );
    }

    // ---------------------------------------------------------
    // Archive / Restore
    // ---------------------------------------------------------

    function testArchiveAchievement() public {
        createDefaultAchievement();

        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        assertTrue(
            achievementRegistry.isArchived(0)
        );

        assertFalse(
            achievementRegistry.isLive(0)
        );

        assertFalse(
            achievementRegistry.isEnded(0)
        );
    }

    function testArchiveDoesNotChangeData() public {
        createDefaultAchievement();

        AchievementRegistry.Achievement memory beforeArchive =
            achievementRegistry.getAchievement(0);

        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        AchievementRegistry.Achievement memory afterArchive =
            achievementRegistry.getAchievement(0);

        assertEq(
            afterArchive.id,
            beforeArchive.id
        );

        assertEq(
            afterArchive.issuer,
            beforeArchive.issuer
        );

        assertEq(
            afterArchive.title,
            beforeArchive.title
        );

        assertEq(
            afterArchive.description,
            beforeArchive.description
        );

        assertEq(
            afterArchive.metadataURI,
            beforeArchive.metadataURI
        );

        assertEq(
            afterArchive.expirationDate,
            beforeArchive.expirationDate
        );

        assertFalse(afterArchive.deleted);
        assertTrue(afterArchive.archived);
    }

    function testRestoreLiveAchievement() public {
        createDefaultAchievement();

        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        vm.prank(issuer);

        achievementRegistry.restoreAchievement(0);

        assertFalse(
            achievementRegistry.isArchived(0)
        );

        assertTrue(
            achievementRegistry.isLive(0)
        );
    }

    function testRestoreEndedAchievement() public {
        createDefaultAchievement();

        vm.warp(expirationDate);

        assertTrue(
            achievementRegistry.isEnded(0)
        );

        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        vm.prank(issuer);

        achievementRegistry.restoreAchievement(0);

        assertFalse(
            achievementRegistry.isArchived(0)
        );

        assertTrue(
            achievementRegistry.isEnded(0)
        );
    }

    // ---------------------------------------------------------
    // Delete
    // ---------------------------------------------------------

    function testDeleteAchievement() public {
        createDefaultAchievement();

        vm.prank(issuer);

        achievementRegistry.deleteAchievement(0);

        assertTrue(
            achievementRegistry.isDeleted(0)
        );
    }

    function testCannotDeleteAchievementTwice()
        public
    {
        createDefaultAchievement();

        vm.startPrank(issuer);

        achievementRegistry.deleteAchievement(0);

        vm.expectRevert(
            "Achievement already deleted"
        );

        achievementRegistry.deleteAchievement(0);

        vm.stopPrank();
    }

    function testDeletedAchievementCannotCreateEvent()
        public
    {
        createDefaultAchievement();

        vm.prank(issuer);

        achievementRegistry.deleteAchievement(0);

        assertFalse(
            achievementRegistry.isValidForEventCreation(0)
        );
    }

    // ---------------------------------------------------------
    // Event-creation eligibility
    // ---------------------------------------------------------

    function testEndedAchievementCannotCreateEvent()
        public
    {
        createDefaultAchievement();

        vm.warp(expirationDate);

        assertFalse(
            achievementRegistry.isValidForEventCreation(0)
        );
    }

    function testArchivedAchievementCannotCreateEvent()
        public
    {
        createDefaultAchievement();

        vm.prank(issuer);

        achievementRegistry.archiveAchievement(0);

        assertFalse(
            achievementRegistry.isValidForEventCreation(0)
        );
    }

    function testExtendExpirationMakesAchievementLiveAgain()
        public
    {
        createDefaultAchievement();

        vm.warp(expirationDate);

        assertTrue(
            achievementRegistry.isEnded(0)
        );

        uint256 newExpiration =
            block.timestamp + 30 days;

        vm.prank(issuer);

        achievementRegistry.updateAchievement(
            0,
            "OPN Builder Marathon",
            "Builder achievement",
            "ipfs://achievement",
            newExpiration
        );

        assertTrue(
            achievementRegistry.isLive(0)
        );
    }
}