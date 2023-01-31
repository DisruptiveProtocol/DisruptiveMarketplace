// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "./ERC1155.sol";

contract FactoryERC1155 is AccessControl {
    error nottheadmin();
    error collectionexists();

    ///@notice Mapping that stores the contracts created
    ///@dev You can search with the name of the collection.
    mapping(string => address) public collections;

    address public market;
    address public admin = 0x30268390218B20226FC101cD5651A51b12C07470;

    event contractcreated(address collectioncontract, address creator);

    constructor(address _market) {
        _setupRole(DEFAULT_ADMIN_ROLE, admin);
        _setupRole(DEFAULT_ADMIN_ROLE, 0x30268390218B20226FC101cD5651A51b12C07470);
        market = _market;
    }

    ///@dev Applicable configuration parameters for the creation of a new lazymint ERC721 contract:
    ///@dev --> The maximum supply that the nft collection will have : _maxsupply
    ///@dev --> The name of the collection : name_
    ///@dev --> The symbol of the collection : symbol_
    ///@dev --> The address of the marketplace contract: market
   /*  function create(
        string calldata name_,
        string calldata symbol_,
        uint256[] calldata _id, 
        uint256[] calldata _supply, 
        string[] calldata _uri
    ) public {
        address _name = collections[name_];
        if (_name != address(0)) {
            revert collectionexists();
        }
        Objects collection = new Objects(_id, _supply, _uri, name_, symbol_, market);
        collections[name_] = address(collection);
        emit contractcreated(address(collection), msg.sender);
    }
 */
    ///@dev Allow to update the marketplace address.
    ///@dev Only the wallet with administrator role can make the change.
    function updateMarket(address _market) public {
        if (!hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) {
            revert nottheadmin();
        }
        market = _market;
    }
}
