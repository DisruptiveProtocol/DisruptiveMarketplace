// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ILazymintV2.sol";

contract LazyNFTV2 is AccessControl, ERC721 {
    using Strings for uint256;
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    //bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE"); //You activate this role if you want to create a new administrative role.

    uint256 public maxSupply = 100; //Enter here the max supply that you want the NFT collection to have.
    Counters.Counter internal supply;
    string public uriPrefix = "";
    string public uriSuffix = ".json";

    bool public paused = false;

    constructor(address _market, string memory _baseUri)
        ERC721("Lazy Market NFT V2", "LMNFT2")
    {
        //This function (_setupRole) helps to assign an administrator role that can then assign new roles.
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, _market);
        //_setupRole(ADMIN_ROLE, msg.sender);
        setUriPrefix(_baseUri);
    }

    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    function redeem(address _redeem) external returns (uint256) {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        require(!paused, "The contract is paused!");
        require(supply.current() <= maxSupply, "Max supply exceeded!");
        supply.increment();
        _safeMint(_redeem, supply.current());
        return supply.current();
    }

    function walletOfOwner(address _owner)
        public
        view
        returns (uint256[] memory)
    {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
        uint256 currentTokenId = 1;
        uint256 ownedTokenIndex = 0;

        while (
            ownedTokenIndex < ownerTokenCount && currentTokenId <= maxSupply
        ) {
            address currentTokenOwner = ownerOf(currentTokenId);

            if (currentTokenOwner == _owner) {
                ownedTokenIds[ownedTokenIndex] = currentTokenId;

                ownedTokenIndex++;
            }

            currentTokenId++;
        }

        return ownedTokenIds;
    }

    //If you need the option to pause the contract, activate this function and the ADMIN role.
    function setPaused(bool _state) public {
        require(
            /*hasRole(ADMIN_ROLE, msg.sender) ||*/
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "not a Admin"
        );
        paused = _state;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        _tokenId.toString(),
                        uriSuffix
                    )
                )
                : "";
    }

    function setUriPrefix(string memory _uriPrefix) internal {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "not a admin");
        uriPrefix = _uriPrefix;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return uriPrefix;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControl, ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
