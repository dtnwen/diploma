import { React, useState, useEffect } from 'react';
import { Link as ReactLink, useLocation } from 'react-router-dom';
import { Text, List, Button, Link, Container } from '@chakra-ui/react';
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { connectWallet } from '../utils/interact';

const Navbar = ({ walletAddress, setWalletAddress }) => {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    connect();
    addWalletChangeListener();
  }, []);

  const connect = async () => {
    setShowLoader(true);
    const wallet = await connectWallet();

    setWalletAddress(wallet);
    setShowLoader(false);
  };

  const addWalletChangeListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      });
    } else {
      // Implement link to install Metamask later
    }
  };

  return (
    <>
      <Container
        display="flex"
        minW="350px"
        maxW="1920px"
        p="2em 2em"
        color="white"
        w="100%"
        h="5vh"
        justify="space-between"
        align="center"
        alignItems="center"
        bgGradient="linear(270deg, rgba(250, 186, 161, 0.68) 0%, rgba(208, 139, 177, 0.841185) 54.2%, #A75CC1 100%)"
      >
        <Text
          flex="1"
          fontFamily="logo"
          align="left"
          fontWeight="bold"
          fontSize="2em"
        >
          Zintea
        </Text>
        <List
          fontFamily="base"
          fontSize="1em"
          display={['none', null, 'flex']}
          flex="3"
          justifyContent="center"
        >
          <Navigation />
        </List>
        <Box flex="1">
          <Menu>
            <MenuButton
              as={Button}
              isLoading={!Boolean(walletAddress) && showLoader}
              loadingText="Signing in"
              rightIcon={Boolean(walletAddress) && <ChevronDownIcon />}
              fontFamily="base"
              fontSize="1em"
              borderRadius="50px"
              bgColor="#D08BB1"
              onClick={connect}
            >
              {Boolean(walletAddress) ? (
                'Connected: ' +
                String(walletAddress).substring(0, 6) +
                '...' +
                String(walletAddress).substring(38)
              ) : (
                //  Implementation drop down > sign out function later
                <>Sign in</>
              )}
            </MenuButton>
            {Boolean(walletAddress) && (
              <MenuList>
                <MenuItem as={ReactLink} to="/profile" color="#D198E4">
                  Profile
                </MenuItem>
                {/* <MenuDivider />
                <Button onClick={disconnect}>Signout</Button> */}
              </MenuList>
            )}
          </Menu>
        </Box>
      </Container>
    </>
  );
};

const Navigation = () => {
  const location = useLocation();

  if (location.pathname == '/') {
    return (
      <>
        <Link as={ReactLink} to="/" pl="1em" pr="1em">
          Home
        </Link>
        <Link as={ReactLink} to="/how" pl="1em" pr="1em">
          How it works
        </Link>
        <Link as={ReactLink} to="/about" pl="1em" pr="1em">
          About us
        </Link>
        <Link as={ReactLink} to="/faq" pl="1em" pr="1em">
          FAQ
        </Link>
      </>
    );
  } else if (location.pathname == '/profile') {
    return (
      <>
        <Link as={ReactLink} to="/" pl="1em" pr="1em">
          Home
        </Link>
        <Link as={ReactLink} to="/" pl="1em" pr="1em">
          Gallery
        </Link>
      </>
    );
  }
};

export default Navbar;
