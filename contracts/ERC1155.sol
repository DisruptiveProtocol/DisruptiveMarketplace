// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ERC1155URIStorage.sol";

contract Objects is AccessControl, Ownable, ERC115URIStorage {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    //Load Ownable contract to asociate collection in Opensea
    error exceedssupply();
    error lenghtmismatch();

    using Strings for uint256;
    string private _name;
    string private _symbol;

    constructor(uint256[] memory _id, uint256[] memory _supply, string[] memory _uri, string memory name_, string memory symbol_, address _market) ERC1155("") {
        uint256 length = _id.length;

        if(length != _supply.length && length != _uri.length){
                revert lenghtmismatch();
        }

        for(uint256 i = 0; i < _id.length ; ){
            create(
                _id[i],
                msg.sender,
                _supply[i],
                _uri[i],
                ""
            );
            unchecked {
                ++i;
            }
        }
        _setupRole(MINTER_ROLE, _market);
        _name = name_;
        _symbol = symbol_;
    }

    function create(
        uint256 id,
        address _user,
        uint256 amount,
        string memory _tokenURI,
        bytes memory data
    ) public {
        uint256 max = supply[id];
        if (max >= 100) {
            revert exceedssupply();
        }
        supply[id] += amount;
        _mint(_user, id, amount, data);
        _setTokenURI(id, _tokenURI);
    }

    function createBatch(
        uint256[] calldata ids,
        address _user,
        uint256[] calldata amounts,
        string[] calldata _tokenURI,
        bytes calldata data
    ) public {
        uint length = ids.length;
        for(uint i = 0; i <= length;){
            uint256 max = supply[ids[i]];
            if (max >= 100) {
                revert exceedssupply();
            }
            supply[ids[i]] += amounts[i];
            
            _setTokenURI(ids[i], _tokenURI[i]);
            
            unchecked {
                ++i;
            }
        }
        _mintBatch(_user,ids,amounts, data); 
        
        
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(AccessControl, ERC1155) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function name() public view returns(string memory){
        return _name;
    }

    function symbol() public view returns(string memory){
        return _symbol;
    }
}