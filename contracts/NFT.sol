// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC1155, Ownable, Pausable {
    using Counters for Counters.Counter;

    uint256 public constant STANDARD = 0;
    Counters.Counter private _standardCounter;

    constructor()
        ERC1155(
            "ipfs://QmcMyHy3WGLhj9Qo3jM3ykvjQHYoYvkYzTmmXzsLZR4RR5/{id}.json"
        )
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mintStandard() public payable whenNotPaused {
        require(
            _standardCounter.current() <= 2222,
            "Sorry we reach max supply"
        );
        require(
            balanceOf(msg.sender, STANDARD) == 0,
            "You can only own 1 Standard NFT"
        );
        require(msg.value == 0.25 ether, "insufficient balance");
        _mint(msg.sender, STANDARD, 1, "0x00");
        _standardCounter.increment();
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
