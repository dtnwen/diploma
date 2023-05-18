// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract NFT_V2 is
    Initializable,
    ERC1155Upgradeable,
    OwnableUpgradeable,
    PausableUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    uint256 public constant STANDARD = 0;
    CountersUpgradeable.Counter private _standardCounter;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC1155_init(
            "ipfs://QmcMyHy3WGLhj9Qo3jM3ykvjQHYoYvkYzTmmXzsLZR4RR5/{id}.json"
        );
        __Ownable_init();
        __Pausable_init();
    }

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
        require(msg.value == 0.005 ether, "insufficient balance");
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
