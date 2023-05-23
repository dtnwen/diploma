const { ethereum } = window;
const { ethers } = require('ethers');

const CONTRACT_ABI = require('../assets/contract_abi.json');
const CONTRACT_ADDRESS = '0x53CFBAa67156102220DDf3a1a9452A9600aB0654';

export const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

// export const getCurrentAccount = async () => {
//     if (ethereum) {
//         try {
//             const walletAccounts = await ethereum.request({method: 'eth_accounts'});
//             if (walletAccounts.length > 0) {
//                 return walletAccounts[0];
//             }

//         } catch (error) {
//             console.error(error)
//         }
//     }
// }

export const connectWallet = async () => {
  if (ethereum) {
    try {
      const walletAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });
      return walletAccounts[0]    
    } catch (error) {
      console.error(error);
    }
  } else
    return {
      status: false,
    };
};

export const mintNFT = async () => {
  if (ethereum) {
    try {
      const walletAccounts = await ethereum.request({ method: 'eth_accounts' });
      if (walletAccounts.length > 0) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );
        const txn = await contract.mintStandard({
          value: ethers.utils.parseEther('0.25'),
        });
        await txn.wait();
        return true;
      } else {
        return 'Please sign in first';
      }
    } catch (error) {
      console.error(error);
      return error.reason;
    }
  } else
    return (
      <>
        You must install Metamask in your browser. 
        <a href={`https://metamask.io`}>
          Click here to install!
        </a>
      </>
    );
};
