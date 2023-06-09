const { expect, assert } = require('chai');
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, upgrades } = require('hardhat');
require('dotenv').config()

describe('NFT contract function test', function() {
    async function deployContract() {
        const [ owner, signer ] = await ethers.getSigners();
    
        const NFT = await ethers.getContractFactory('NFT');
        const nft = await upgrades.deployProxy(NFT)

        const price = ethers.utils.parseEther("0.25");

        return {nft, owner, signer, price };
    }

    describe('Deployment test', function() {
        it('Should deploy and set owner to msg.sender', async function () {
            const { nft, owner } = await loadFixture(deployContract);

            expect(await nft.owner()).to.equal(owner.address);
        })

        it('Should change owner correctly', async function () {
            const { nft, owner, signer } = await loadFixture(deployContract);

            await nft.transferOwnership(signer.address);
            expect(await nft.owner()).to.equal(signer.address)
        })

        it('Should set URI correctly', async function () {
            const { nft } = await loadFixture(deployContract);
            
            expect(await nft.uri(0)).to.equal("ipfs://QmcMyHy3WGLhj9Qo3jM3ykvjQHYoYvkYzTmmXzsLZR4RR5/{id}.json")
        })

    })

    describe('setURI function test', function() {
        it('Should let owner set new URI', async function () {
            const { nft } = await loadFixture(deployContract);
            await nft.setURI("ipfs://QmXzj6yXG6C8BT75BS7N4SSgkGwgryWbqZjUyQi2xCM63m");

            expect(await nft.uri(0)).to.equal("ipfs://QmXzj6yXG6C8BT75BS7N4SSgkGwgryWbqZjUyQi2xCM63m")
        })

        it('Should not let non-owner set new URI', async function () {
            const { nft, signer } = await loadFixture(deployContract);
            // have to wait for the transaction to be mined so need to put await first
            await expect(nft.connect(signer).setURI("ipfs://QmXzj6yXG6C8BT75BS7N4SSgkGwgryWbqZjUyQi2xCM63m")).to.be.reverted;
        })
    })

    describe('Mint function test', function() {
        it('Should let non-owners mint a NFT to their wallet', async function () {
            const { nft, signer, price } = await loadFixture(deployContract);
            await nft.connect(signer).mintStandard({value: price});

            expect(await nft.balanceOf(signer.address, 0)).to.equal(1);
        })

        it('Should not let non-owners mint more than 1 NFT', async function () {
            const { nft, signer, price } = await loadFixture(deployContract);
            await nft.connect(signer).mintStandard({value: price});

            await expect(nft.connect(signer).mintStandard({value: price})).to.be.revertedWith("You can only own 1 Standard NFT");
        })

        it('Must be pay exactly 0.25 ether to mint the NFT', async function () {
            const { nft, signer } = await loadFixture(deployContract);

            await expect(nft.connect(signer).mintStandard({value: ethers.utils.parseEther("0.24")})).to.be.revertedWith("insufficient balance");
        })

        // it('Should let mint only 2222 NFT', async function () {
        //     const {owner, nft, price} = await loadFixture(deployContract);

        //     const hdNode = await ethers.utils.HDNode.fromMnemonic(process.env.SEED_PHRASE)
        
        //     for (let i = 0; i < 2222; i++) {
        //         const signers = await ethers.getSigner(hdNode.derivePath(`m/44'/60'/0'/0/${i}`).address);

        //         console.log('creating signer: ', signers.address)

        //         const tx = {
        //             to: signers.address,
        //             value: ethers.utils.parseEther("1")
        //         }
        //         console.log('creating transaction: ', tx)

        //         const txn = await owner.sendTransaction(tx);
        //         console.log('Mining transaction...')

        //         await txn.wait()
        //         console.log('Transaction mined!')

        //         await nft.connect(signers).mintStandard({value:price})
        //         console.log('Minting nft')

        //         expect(await nft.balanceOf(signer.address, 0)).to.be.equal(1);
        //     }

        // })
    })

    describe('Transfer token test', function() {
        it('Should allow owner to transfer token', async function () {
            const { nft, owner, signer, price } = await loadFixture(deployContract);

            await nft.mintStandard({value: price});        
            await nft.safeTransferFrom(owner.address, signer.address, 0, 1, '0x00');

            expect(await nft.balanceOf(signer.address, 0)).to.equal(1);
        })

        it('Should allow non-owner to transfer token', async function () {
            const { nft, owner, signer, price } = await loadFixture(deployContract);

            await nft.connect(signer).mintStandard({value: price});        
            await nft.connect(signer).safeTransferFrom(signer.address, owner.address, 0, 1, '0x00');

            expect(await nft.balanceOf(owner.address, 0)).to.equal(1);
        })
    })

    describe('Pause feature test', function() {
        it('Should allow owner to change pause state and show state correctly', async function () {
            const { nft } = await loadFixture(deployContract);

            assert.equal(await nft.paused(), false);
            await expect(nft.unpause()).to.be.reverted;
            await nft.pause()
            assert.equal(await nft.paused(), true);

            await expect(nft.pause()).to.be.reverted;
            await nft.unpause()
            assert.equal(await nft.paused(), false);      
        })

        it('Should not allow non-owner to change pause state', async function () {
            const { nft, signer } = await loadFixture(deployContract);

            await expect(nft.connect(signer).pause()).to.be.reverted;
            await nft.pause();
            assert.equal(await nft.paused(), true)
            await expect(nft.connect(signer).unpause()).to.be.reverted;
        })

        it('Should not allow neither owner nor non-owner to mint when pause contract', async function () {
            const { nft, signer, price } = await loadFixture(deployContract);

            await nft.pause();
            await expect(nft.connect(signer).mintStandard({value: price})).to.be.reverted;
            await expect(nft.mintStandard({value: price})).to.be.reverted;
        })        

        it('Should allow to transfer token when pause contract', async function () {
            const { nft, owner, signer, price } = await loadFixture(deployContract);

            await nft.mintStandard({value: price});        
            await nft.pause()
            await nft.safeTransferFrom(owner.address, signer.address, 0, 1, '0x00');

            expect(await nft.balanceOf(signer.address, 0)).to.equal(1);
        })
    })

    describe('Test for upgrading contracts', function() {
        it('Should change Implementation correctly', async function () {
            const { nft } = await loadFixture(deployContract);
            
            const nft1 = await upgrades.erc1967.getImplementationAddress(nft.address)
            const NFT2 = await ethers.getContractFactory('NFT_V2');
            
            const upgraded = await upgrades.upgradeProxy(nft, NFT2);
            const nft2 = await upgrades.erc1967.getImplementationAddress(nft.address)

            assert.notEqual(nft1, nft2) 
        })

        it('Should transfer proxy admin', async function () {
            const { signer, owner } = await loadFixture(deployContract);

            await upgrades.admin.transferProxyAdminOwnership(signer.address)
            await expect(upgrades.admin.transferProxyAdminOwnership(signer.address, owner)).to.be.revertedWith('Ownable: caller is not the owner');                
        })

        it('Should let admin only to transfer proxy admin', async function () {
            const { nft, signer } = await loadFixture(deployContract);

            await expect(upgrades.admin.transferProxyAdminOwnership(signer.address, signer)).to.be.reverted;
        })

        it('Should let admin only to transfer implementation', async function () {
            const { nft, signer } = await loadFixture(deployContract);

            const NFT2 = await ethers.getContractFactory('NFT_V2');
            await upgrades.admin.transferProxyAdminOwnership(signer.address);
            
            await expect(upgrades.upgradeProxy(nft, NFT2)).to.be.revertedWith('Ownable: caller is not the owner');
        })
    })
})