//SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract MigrateMarket is AccessControl {

    bytes32 public constant DEV_ROLE = keccak256("DEV_ROLE");
    address public oldMarket;
    address public newMarket;

}