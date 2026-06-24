// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {AccessControlManager} from "../src/access/AccessControlManager.sol";
import {IssuerRegistry} from "../src/registry/IssuerRegistry.sol";

contract IssuerRegistryTest is Test {
    AccessControlManager accessManager;
    IssuerRegistry issuerRegistry;

    address admin = address(1);
    address issuer = address(2);

    function setUp() public {
        vm.prank(admin);
        accessManager = new AccessControlManager(admin);

        issuerRegistry = new IssuerRegistry(address(accessManager));
    }

    //Test 1 - Register issuer
    function testRegisterIssuer() public {
        vm.prank(issuer);

        issuerRegistry.registerIssuer("OPN Foundation", "ipfs://metadata");

        (string memory name, , bool approved, bool exists) = issuerRegistry
            .issuers(issuer);

        assertEq(keccak256(bytes(name)), keccak256(bytes("OPN Foundation")));

        assertFalse(approved);
        assertTrue(exists);
    }

    //Test 2 - Approve issuer
    function testApproveIssuer() public {
        vm.prank(issuer);

        issuerRegistry.registerIssuer("OPN Foundation", "ipfs://metadata");

        vm.prank(admin);

        issuerRegistry.approveIssuer(issuer);

        bool approved = issuerRegistry.isApprovedIssuer(issuer);

        assertTrue(approved);
    }

    //Test 3 - Revoke issuer
    function testRevokeIssuer() public {
        vm.prank(issuer);

        issuerRegistry.registerIssuer("OPN Foundation", "ipfs://metadata");

        vm.prank(admin);

        issuerRegistry.approveIssuer(issuer);

        vm.prank(admin);

        issuerRegistry.revokeIssuer(issuer);

        bool approved = issuerRegistry.isApprovedIssuer(issuer);

        assertFalse(approved);
    }
}
