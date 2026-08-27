// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";

import "../src/registry/IssuerRegistry.sol";
import "../src/registry/AchievementRegistry.sol";
import "../src/registry/EventRegistry.sol";
import "../src/token/AchievementSBT.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        // 1. Deploy IssuerRegistry
        IssuerRegistry issuerRegistry = new IssuerRegistry();

        // 2. Deploy AchievementRegistry
        AchievementRegistry achievementRegistry =
            new AchievementRegistry(
                address(issuerRegistry)
            );

        // 3. Deploy EventRegistry
        EventRegistry eventRegistry =
            new EventRegistry(
                address(issuerRegistry),
                address(achievementRegistry)
            );

        // 4. Deploy AchievementSBT
        AchievementSBT achievementSBT =
            new AchievementSBT(
                address(achievementRegistry),
                address(eventRegistry)
            );

        console.log(
            "IssuerRegistry:",
            address(issuerRegistry)
        );

        console.log(
            "AchievementRegistry:",
            address(achievementRegistry)
        );

        console.log(
            "EventRegistry:",
            address(eventRegistry)
        );

        console.log(
            "AchievementSBT:",
            address(achievementSBT)
        );

        vm.stopBroadcast();
    }
}