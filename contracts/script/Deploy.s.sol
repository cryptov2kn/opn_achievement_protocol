// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";

import "../src/access/AccessControlManager.sol";
import "../src/registry/IssuerRegistry.sol";
import "../src/registry/EventRegistry.sol";
import "../src/registry/AchievementRegistry.sol";
import "../src/token/AchievementSBT.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        AccessControlManager access = new AccessControlManager(
            vm.addr(deployerPrivateKey)
        );

        IssuerRegistry issuer = new IssuerRegistry(address(access));

        EventRegistry eventRegistry = new EventRegistry(address(issuer));

        AchievementRegistry achievement = new AchievementRegistry(
            address(issuer),
            address(eventRegistry)
        );

        AchievementSBT sbt = new AchievementSBT(address(achievement));

        console.log("AccessControlManager:", address(access));

        console.log("IssuerRegistry:", address(issuer));

        console.log("EventRegistry:", address(eventRegistry));

        console.log("AchievementRegistry:", address(achievement));

        console.log("AchievementSBT:", address(sbt));

        vm.stopBroadcast();
    }
}
