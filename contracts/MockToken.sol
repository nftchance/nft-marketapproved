// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev The OpenSea interface system that allows for approval fee skipping.
 */
contract OwnableDelegateProxy { }
contract OpenSeaProxyRegistry {
    mapping(address => OwnableDelegateProxy) public proxies;
}

/**
 * @dev A simple ERC721 implementation to display the working and testings of OS proxy registry utilization. Goodbye apsproval fees.
 */
contract MockToken is ERC721 {
    uint256 totalSupply;

    address public proxyRegistryAddr;
    mapping(address => bool) public addressToRegistryDisabled;

    /**
     * @dev Is initialized with the OS Proxy Registry address.
     */
    constructor(
        address _proxyRegistryAddr
    ) ERC721("MockToken", "MockToken") {
        proxyRegistryAddr = _proxyRegistryAddr;
    }

    function tokenURI(
        uint256
    ) public pure virtual override returns (string memory) {}

    /**
    * @notice Mints ERC721 tokens
    * @param to         The account that tokens are being minted to
    * @param count      The number of tokens to mint
    */
    function mint(
         address to
        ,uint256 count
    ) public virtual {
        for(uint256 i = 0; i < count; i++) {
            _mint(to, totalSupply++);
        }
    }
  
    /**
    * @notice Allow a user to disable this pre-approval if they believe OS to not be secure.
    */
    function toggleRegistryAccess() public virtual {
        addressToRegistryDisabled[msg.sender] = !addressToRegistryDisabled[msg.sender];
    }

    /**
    * @notice Allow a user to disable this pre-approval if they believe OS to not be secure.
    * @param owner      The active owner of the token
    * @param spender    The origin of the action being called
    */
   function isApprovedForAll(
         address owner
        ,address spender
    ) public view override returns (bool) {
        OpenSeaProxyRegistry proxyRegistry = OpenSeaProxyRegistry(proxyRegistryAddr);

        if(address(proxyRegistry.proxies(owner)) == spender 
            && !addressToRegistryDisabled[owner])
            return true;

        return super.isApprovedForAll(owner, spender);
    }
}