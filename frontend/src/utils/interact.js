const { ethereum } = window
const { ethers } = require("ethers");
const { Network, Alchemy } = require("alchemy-sdk")

const CONTRACT_ABI = require('../assets/contract_abi.json')
const CONTRACT_ADDRESS='0x53CFBAa67156102220DDf3a1a9452A9600aB0654'

// const settings = {
//     apiKey: process.env.API_KEY,
//     network: Network.ETH_SEPOLIA,
// }

// const alchemy = new Alchemy(settings)

export const isMetamaskInstalled = () => {
    if (ethereum) {
        return ethereum.isMetaMask
    }
}

export const getCurrentAccount = async () => {
    try {
        if (ethereum) {
            const walletAccounts = await ethereum.request({method: 'eth_accounts'});
            if (walletAccounts.length > 0) {
                return walletAccounts[0];
            }
        }
            
    } catch (error) {
        console.error(error)
    }
}

export const connectWallet = async () => {
    try {
        if (ethereum) {
            const walletAccounts = await ethereum.request({method: 'eth_requestAccounts'})
            return walletAccounts[0]
        } 
    } catch (error) {
        console.error(error)
    }
}

export const mintNFT = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer )
    try {
        const txn = await contract.mintStandard({value: ethers.utils.parseEther("0.25")})
        await txn.wait()
        console.log(txn)
        return true
    } catch(error) {
        console.log(error)
        return false
    }
}
