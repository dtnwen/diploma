const { ethers, upgrades } = require("hardhat");

async function main() {
  const NFT = await ethers.getContractFactory('NFT');
  const nft = await upgrades.deployProxy(NFT);
  console.log('Deploying...');
  await nft.deployed()
  console.log('Deployed!')

  console.log('Proxy addres: ', nft.address)
  console.log('Proxy admin address: ', await upgrades.erc1967.getAdminAddress(nft.address))
  console.log('Implementation address: ', await upgrades.erc1967.getImplementationAddress(nft.address));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });