import { utils } from 'ethers';
import { React, useState, useEffect } from 'react';
import { useOutletContext, Link as ReactLink } from 'react-router-dom';

import {
  Text,
  Link,
  Container,
  Heading,
  Image,
  Box,
  Center,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  SimpleGrid,
} from '@chakra-ui/react';
import Card from '../components/Cards';
import { getNFTs } from '../utils/verify';
import { codeGenerate } from '../utils/promocode';

const Profile = () => {
  const [walletAddress, setWalletAddress] = useOutletContext();
  const [nftsOwn, setNftsOwn] = useState([]);
  const [verified, setVerified] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const date = new Date();

  const getNFT = async () => {
    try {
      if (Boolean(walletAddress)) {
        setShowLoader(true);
        const response = await getNFTs();
        await setNftsOwn(response);
      } else {
        setShowLoader(true);
        setVerified(false);
        setShowLoader(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (nftsOwn.length) {
      setVerified(true);
      setShowLoader(false);
    } else {
      setVerified(false);
      setShowLoader(false);
    }
  }, [nftsOwn]);

  useEffect(() => {
    getNFT();
    addWalletChangeListener();
  }, [walletAddress]);

  const addWalletChangeListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accounts => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress('');
        }
      });
    } else {
      // Implement link to install Metamask later
    }
  };
  return (
    <>
      <Container
        centerContent
        minW="350px"
        minH="100vh"
        maxW="1920px"
        maxH="1080px"
        w="100%"
        bgGradient="linear(270deg, rgba(250, 186, 161, 0.68) 0%, rgba(208, 139, 177, 0.841185) 54.2%, #A75CC1 100%)"
      >
        <Heading
          fontSize={[32, null, 64, null, 90]}
          color="#FEE7D1"
          fontFamily="base"
          fontWeight="bold"
        >
          Your subscriptions
        </Heading>

        <SimpleGrid
          minH="40vh"
          maxH="1080px"
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
          {verified &&
            nftsOwn.map(nft => {
              return <Card nftsOwn={nft} />;
            })}
        </SimpleGrid>

        <Button
          isLoading={!verified && showLoader}
          loadingText="Verifying"
          onClick={getNFT}
          fontFamily="base"
          fontSize="1.5em"
          m="1em"
          p="1em"
          bgColor="#A75CC1"
          color="white"
          borderRadius="50px"
          filter="drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.25));"
        >
          {verified ? 'Verified' : 'Verify ownership'}
        </Button>
        {verified && (
          <Center
            mb="1.5em"
            p="0.5em"
            w="40%"
            borderRadius="15px"
            bgColor="#D9D9D9"
          >
            <Text
              ml="1em"
              color="white"
              fontFamily="alt"
              fontWeight="bold"
              fontSize="1.5em"
            >
              Your code: {codeGenerate(walletAddress).slice(2, 6)}
            </Text>
          </Center>
        )}
        {!walletAddress && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>You haven't signed in yet!</AlertTitle>
            <AlertDescription>
              Please connect wallet to continue
            </AlertDescription>
          </Alert>
        )}
        {!verified && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>You don't own any NFTs</AlertTitle>
            <AlertDescription>
              Please buy{' '}
              <Link as={ReactLink} to="/">
                here
              </Link>
            </AlertDescription>
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Profile;
