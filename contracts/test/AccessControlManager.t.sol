// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {AccessControlManager} from "../src/access/AccessControlManager.sol";

contract AccessControlManagerTest is Test {
    AccessControlManager manager;

    address admin = address(1);
    address issuer = address(2);

    function setUp() public {
        vm.prank(admin);

        manager = new AccessControlManager(admin);
    }

    function testGrantIssuerRole() public {
        vm.prank(admin);

        manager.grantIssuerRole(issuer);

        assertTrue(manager.isIssuer(issuer));
    }

    function testRevokeIssuerRole() public {
        vm.startPrank(admin);

        manager.grantIssuerRole(issuer);

        manager.revokeIssuerRole(issuer);

        vm.stopPrank();

        assertFalse(manager.isIssuer(issuer));
    }
}
