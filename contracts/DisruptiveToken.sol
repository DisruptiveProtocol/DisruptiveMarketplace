// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockToken is ERC20 {

    address immutable deployer = 0x30268390218B20226FC101cD5651A51b12C07470;
    constructor() ERC20("Burn Token", "BT") {
        _mint(msg.sender, 1000000000000000000000000000);
    }

    modifier onlyDeployer() {
        if(msg.sender != deployer){
            revert("not the deployer");
        }
        _;
    }

    function create() public onlyDeployer {
        _mint(msg.sender,10000000000000000000000);
    }

    function burn(uint256 _amount) public {
        _burn(msg.sender,_amount);
    }
}
