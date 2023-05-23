import { React, useState } from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import Navbar from './components/Navbar'
import theme from './theme'
import Fonts from './assets/Fonts'
import Landingpage from './routes/Landingpage'
import { Outlet } from 'react-router-dom';

function App() {
  const [walletAddress, setWalletAddress] = useState("");

  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Navbar walletAddress={walletAddress} setWalletAddress={setWalletAddress}/>
      <Outlet context={[walletAddress, setWalletAddress]}/>
    </ChakraProvider>
  );
}

export default App;
