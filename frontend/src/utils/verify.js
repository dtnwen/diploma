const { Network, Alchemy } = require("alchemy-sdk")
const { ethereum } = window
const CONTRACT_ADDRESS='0x53CFBAa67156102220DDf3a1a9452A9600aB0654'

const settings = {
    apiKey: process.env.API_KEY,
    network: Network.ETH_SEPOLIA,
}

const alchemy = new Alchemy(settings)

export const getNFTs = async () => {
    if (ethereum) {
        try {
            const response = await alchemy.nft.getNftsForOwner(ethereum.selectedAddress, [CONTRACT_ADDRESS])
            console.log('Got Nft')
            return response.ownedNfts;
        } catch(error) {
            console.error(error)
        }
    }
}