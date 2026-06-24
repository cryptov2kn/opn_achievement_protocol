// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../access/AccessControlManager.sol";

contract IssuerRegistry {
    struct Issuer {
        string name;
        string metadataURI;
        bool approved;
        bool exists;
    }

    mapping(address => Issuer) public issuers;

    AccessControlManager public accessManager;

    event IssuerRegistered(address indexed issuer, string name);

    event IssuerApproved(address indexed issuer);

    event IssuerRevoked(address indexed issuer);

    constructor(address _accessManager) {
        accessManager = AccessControlManager(_accessManager);
    }

    function registerIssuer(
        string calldata name,
        string calldata metadataURI
    ) external {
        require(!issuers[msg.sender].exists, "Already registered");

        issuers[msg.sender] = Issuer({
            name: name,
            metadataURI: metadataURI,
            approved: false,
            exists: true
        });

        emit IssuerRegistered(msg.sender, name);
    }

    function approveIssuer(address issuer) external {
        require(
            accessManager.hasRole(
                accessManager.DEFAULT_ADMIN_ROLE(),
                msg.sender
            ),
            "Not admin"
        );

        require(issuers[issuer].exists, "Issuer not found");

        issuers[issuer].approved = true;

        emit IssuerApproved(issuer);
    }

    function revokeIssuer(address issuer) external {
        require(
            accessManager.hasRole(
                accessManager.DEFAULT_ADMIN_ROLE(),
                msg.sender
            ),
            "Not admin"
        );

        issuers[issuer].approved = false;

        emit IssuerRevoked(issuer);
    }

    function isApprovedIssuer(address issuer) external view returns (bool) {
        return issuers[issuer].approved;
    }
}
