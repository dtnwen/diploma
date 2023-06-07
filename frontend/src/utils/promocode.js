const { utils } = require('ethers');
const { Network, Alchemy } = require('alchemy-sdk');

const settings = {
  apiKey: process.env.REACT_APP_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

const CONTRACT_ADDRESS = '0x53CFBAa67156102220DDf3a1a9452A9600aB0654';

const date = new Date();
const day = date.getDate();
const dayHash = utils.keccak256(day);

export const validHex = input => {
    try {
      const regex = /^[0-9A-Fa-f]{4}$/g;
  
      if (input.match(regex)) {
        return true;
      } else return false;
    } catch (error) {
      console.error(error);
    }
  };

export const codeGenerate = wallet => {
  try {
    const firstWalletHash = wallet.slice(2, 6);
    const lastWalletHash = wallet.slice(38, 42);

    const code = utils.keccak256(dayHash + firstWalletHash + lastWalletHash);
    return code;
  } catch (error) {
    console.error(error);
  }
};

export const ownerVerify = async (first, last) => {
  try {
    const response = await alchemy.nft.getOwnersForNft(CONTRACT_ADDRESS, 0);
    const owners = response.owners;

    for (let i = 0; i < owners.length; i++) {
      const first4 = owners[i].slice(2, 6);
      const last4 = owners[i].slice(38, 42);

      if (first === first4 && last === last4) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

export const codeVerify = (first, last) => {
    try {
      const code = utils.keccak256(dayHash + first + last);
      return code;
    } catch (error) {
      console.error(error);
    }
  };
  