const { ethers, upgrades } = require("hardhat");

const PROXY='0x53CFBAa67156102220DDf3a1a9452A9600aB0654';

async function main() {
    const NFT_V2 = await ethers.getContractFactory('NFT_V2');

    const nft = await upgrades.upgradeProxy(PROXY, NFT_V2)

    const impl2 = await upgrades.erc1967.getImplementationAddress(PROXY);
    console.log('New implementation: ', impl2);
}

main()