// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IssuerRegistry {
    struct Issuer {
        string name;
        string metadataURI;
        bool exists;
    }

    /// @notice Wallet => issuer profile
    /// One wallet can have at most one issuer profile.
    mapping(address => Issuer) public issuers;

    event IssuerRegistered(
        address indexed issuer,
        string name,
        string metadataURI
    );

    /**
     * @notice Register the connected wallet as an issuer.
     *
     * Rules:
     * - one wallet can register only once
     * - issuer becomes valid immediately after registration
     * - no admin approval / role / verification is required
     */
    function registerIssuer(
        string calldata name,
        string calldata metadataURI
    ) external {
        require(
            bytes(name).length > 0,
            "Issuer name required"
        );

        require(
            !issuers[msg.sender].exists,
            "Already registered"
        );

        issuers[msg.sender] = Issuer({
            name: name,
            metadataURI: metadataURI,
            exists: true
        });

        emit IssuerRegistered(
            msg.sender,
            name,
            metadataURI
        );
    }

    /**
     * @notice Check whether a wallet has registered an issuer profile.
     */
    function isIssuer(
        address wallet
    ) external view returns (bool) {
        return issuers[wallet].exists;
    }

    /**
     * @notice Return issuer profile.
     */
    function getIssuer(
        address wallet
    ) external view returns (Issuer memory) {
        require(
            issuers[wallet].exists,
            "Issuer not found"
        );

        return issuers[wallet];
    }
}