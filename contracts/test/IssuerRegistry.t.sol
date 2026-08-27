// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";

contract IssuerRegistryTest is Test {
    IssuerRegistry issuerRegistry;

    address issuer = address(0x100);
    address user = address(0x200);

    function setUp() public {
        issuerRegistry = new IssuerRegistry();
    }

    function testRegisterIssuer() public {
        vm.prank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://issuer"
        );

        IssuerRegistry.Issuer memory profile =
            issuerRegistry.getIssuer(issuer);

        assertEq(profile.name, "OPN Foundation");
        assertEq(profile.metadataURI, "ipfs://issuer");
        assertTrue(profile.exists);
    }

    function testRegisteredWalletIsIssuer() public {
        vm.prank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://issuer"
        );

        assertTrue(
            issuerRegistry.isIssuer(issuer)
        );
    }

    function testUnregisteredWalletIsNotIssuer() public view {
        assertFalse(
            issuerRegistry.isIssuer(user)
        );
    }

    function testCannotRegisterTwice() public {
        vm.startPrank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://issuer"
        );

        vm.expectRevert("Already registered");

        issuerRegistry.registerIssuer(
            "Another Issuer",
            "ipfs://another"
        );

        vm.stopPrank();
    }

    function testGetIssuerProfile() public {
        vm.prank(issuer);

        issuerRegistry.registerIssuer(
            "OPN Foundation",
            "ipfs://metadata"
        );

        IssuerRegistry.Issuer memory profile =
            issuerRegistry.getIssuer(issuer);

        assertEq(
            profile.name,
            "OPN Foundation"
        );

        assertEq(
            profile.metadataURI,
            "ipfs://metadata"
        );

        assertTrue(profile.exists);
    }

    function testGetIssuerRevertsForUnregisteredWallet() public {
        vm.expectRevert("Issuer not found");

        issuerRegistry.getIssuer(user);
    }
}