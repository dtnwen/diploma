import { React, useState } from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import theme from './theme'
import Fonts from './assets/Fonts'
import Landingpage from './components/Landingpage'

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Landingpage walletAddress={walletAddress} setWalletAddress={setWalletAddress}/>
      A
    </ChakraProvider>
  );
}

export default App;
