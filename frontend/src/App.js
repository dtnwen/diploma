import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import theme from './theme'
import Fonts from './Fonts'
import Landingpage from './components/Landingpage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Landingpage />
      A
    </ChakraProvider>
  );
}

export default App;
