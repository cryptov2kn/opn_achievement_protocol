// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";

import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";
import {AchievementRegistry} from "../src/registry/AchievementRegistry.sol";
import {EventRegistry} from "../src/registry/EventRegistry.sol";
import {AchievementSBT} from "../src/token/AchievementSBT.sol";

contract AchievementSBTTest is Test {
    IssuerRegistry issuerRegistry;
    AchievementRegistry achievementRegistry;
    EventRegistry eventRegistry;
    AchievementSBT achievementSBT;

    address issuer = address(0x100);
    address user = address(0x200);
    address user2 = address(0x300);

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

        achievementSBT =
            new AchievementSBT(
                address(achievementRegistry),
                address(eventRegistry)
            );

        vm.prank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://issuer"
        );

        achievementExpiration =
            block.timestamp + 30 days;

        vm.prank(issuer);

        achievementRegistry.createAchievement(
            "OPN Builder",
            "Builder achievement",
            "ipfs://achievement",
            achievementExpiration
        );

        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Builder Event",
            "Builder Event",
            "online",
            "https://example.com",
            block.timestamp + 1 days,
            block.timestamp + 7 days,
            100
        );
    }

    // ---------------------------------------------------------
    // Mint
    // ---------------------------------------------------------

    function testMintCredential() public {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        assertEq(
            achievementSBT.ownerOf(0),
            user
        );

        AchievementSBT.Credential memory credential =
            achievementSBT.getCredential(0);

        assertEq(
            credential.tokenId,
            0
        );

        assertEq(
            credential.achievementId,
            0
        );

        assertEq(
            credential.eventId,
            0
        );

        assertEq(
            credential.recipient,
            user
        );

        assertEq(
            credential.pointsSnapshot,
            100
        );

        assertTrue(
            credential.active
        );
    }

        function testMintRequiresCorrectEventAchievementRelationship()
        public
    {
        vm.prank(issuer);

        vm.expectRevert("Achievement mismatch");

        achievementSBT.mint(
            user,
            999,
            0
        );
    }

    function testNonEventIssuerCannotMint()
        public
    {
        vm.prank(user);

        vm.expectRevert(
            "Not event issuer"
        );

        achievementSBT.mint(
            user2,
            0,
            0
        );
    }

    function testIssuerCannotReceiveOwnEventCredential()
        public
    {
        vm.prank(issuer);

        vm.expectRevert(
            "Issuer cannot receive own event credential"
        );

        achievementSBT.mint(
            issuer,
            0,
            0
        );
    }

    function testCannotMintTwiceForSameEventAndUser()
        public
    {
        vm.startPrank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.expectRevert(
            "Already claimed"
        );

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.stopPrank();
    }

    function testSameUserCanReceiveCredentialFromDifferentEvents()
        public
    {
        vm.prank(issuer);

        eventRegistry.createEvent(
            0,
            "Builder Event 2",
            "Second Event",
            "online",
            "https://example2.com",
            block.timestamp + 2 days,
            block.timestamp + 8 days,
            250
        );

        vm.startPrank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        achievementSBT.mint(
            user,
            0,
            1
        );

        vm.stopPrank();

        assertEq(
            achievementSBT.ownerOf(0),
            user
        );

        assertEq(
            achievementSBT.ownerOf(1),
            user
        );

        AchievementSBT.Credential memory first =
            achievementSBT.getCredential(0);

        AchievementSBT.Credential memory second =
            achievementSBT.getCredential(1);

        assertEq(
            first.achievementId,
            second.achievementId
        );

        assertEq(
            first.eventId,
            0
        );

        assertEq(
            second.eventId,
            1
        );

        assertEq(
            first.pointsSnapshot,
            100
        );

        assertEq(
            second.pointsSnapshot,
            250
        );
    }

    // ---------------------------------------------------------
    // Point snapshot
    // ---------------------------------------------------------

    function testPointsSnapshotDoesNotChangeAfterEventUpdate()
        public
    {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.prank(issuer);

        eventRegistry.updateEvent(
            0,
            "Updated Event",
            "Updated",
            "online",
            "https://updated.example.com",
            block.timestamp + 1 days,
            block.timestamp + 8 days,
            200
        );

        AchievementSBT.Credential memory credential =
            achievementSBT.getCredential(0);

        assertEq(
            credential.pointsSnapshot,
            100
        );

        assertEq(
            eventRegistry.getEventPoints(0),
            200
        );
    }

    // ---------------------------------------------------------
    // Revoke
    // ---------------------------------------------------------

    function testRevokeCredential() public {
        vm.startPrank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        achievementSBT.revoke(0);

        vm.stopPrank();

        assertFalse(
            achievementSBT.isCredentialActive(0)
        );

        // SBT still exists and remains owned by the user.
        assertEq(
            achievementSBT.ownerOf(0),
            user
        );
    }

    function testCannotRevokeTwice() public {
        vm.startPrank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        achievementSBT.revoke(0);

        vm.expectRevert(
            "Already revoked"
        );

        achievementSBT.revoke(0);

        vm.stopPrank();
    }

    function testNonIssuerCannotRevoke() public {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.prank(user);

        vm.expectRevert(
            "Not event issuer"
        );

        achievementSBT.revoke(0);
    }

    // ---------------------------------------------------------
    // Soulbound
    // ---------------------------------------------------------

    function testSoulboundTransferFails() public {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.prank(user);

        vm.expectRevert("Soulbound");

        achievementSBT.transferFrom(
            user,
            user2,
            0
        );
    }

    function testSafeTransferFails() public {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.prank(user);

        vm.expectRevert("Soulbound");

        achievementSBT.safeTransferFrom(
            user,
            user2,
            0
        );
    }

    // ---------------------------------------------------------
    // User credentials
    // ---------------------------------------------------------

    function testGetUserCredentials()
        public
    {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        uint256[] memory ids =
            achievementSBT.getUserCredentials(
                user
            );

        assertEq(
            ids.length,
            1
        );

        assertEq(
            ids[0],
            0
        );
    }

    function testCredentialExistsForEventRecipient()
        public
    {
        assertFalse(
            achievementSBT
                .credentialExistsForEventRecipient(
                    0,
                    user
                )
        );

        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        assertTrue(
            achievementSBT
                .credentialExistsForEventRecipient(
                    0,
                    user
                )
        );
    }

    // ---------------------------------------------------------
    // Delete parent does not burn SBT
    // ---------------------------------------------------------

    function testEventDeleteDoesNotBurnExistingCredential()
        public
    {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.prank(issuer);

        eventRegistry.deleteEvent(0);

        assertEq(
            achievementSBT.ownerOf(0),
            user
        );

        AchievementSBT.Credential memory credential =
            achievementSBT.getCredential(0);

        assertTrue(
            credential.active
        );
    }

    function testAchievementDeleteDoesNotBurnExistingCredential()
        public
    {
        vm.prank(issuer);

        achievementSBT.mint(
            user,
            0,
            0
        );

        vm.prank(issuer);

        achievementRegistry.deleteAchievement(0);

        assertEq(
            achievementSBT.ownerOf(0),
            user
        );

        AchievementSBT.Credential memory credential =
            achievementSBT.getCredential(0);

        assertEq(
            credential.achievementId,
            0
        );

        assertEq(
            credential.eventId,
            0
        );
    }
}