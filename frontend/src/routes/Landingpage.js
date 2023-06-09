import React, { useEffect, useState } from 'react';
import { Link, Element } from 'react-scroll';
import {
  Container,
  Stack,
  Box,
  Heading,
  Image,
  Button,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react';
import { mintNFT } from '../utils/interact';
import Instruction from './Instruction';
import Hero_image from '../assets/Hero_image.svg';

const Landingpage = () => {
  const [error, setError] = useState(null);

  const mint = async () => {
    const successed = await mintNFT();
    if (successed !== true) {
      setError(successed);
    }
  };

  useEffect(() => {
    setError(null);
  }, []);

  return (
    <>
      <Container
        minW="350px"
        maxW="1920px"
        w="100%"
        bgGradient="linear(270deg, rgba(250, 186, 161, 0.68) 0%, rgba(208, 139, 177, 0.841185) 54.2%, #A75CC1 100%)"
      >
        <Stack direction={['column', null, 'row']}>
          <Box ml="5vw" w={{ md: '45%' }} alignSelf="center">
            <Heading
              maxW={{ md: '11ch' }}
              fontSize={[32, null, 64, null, 90]}
              color="#FEE7D1"
              fontFamily="base"
              fontWeight="bold"
            >
              Unlimited Bubble Tea Joy
            </Heading>
            <Text
              mt="1em"
              mb="2em"
              ml="1em"
              maxW="60h"
              fontSize={[8, 16]}
              color="white"
              fontFamily="alt"
            >
              Invest in a lifetime of happiness with our transferable and
              resellable gift cards - Buy once, enjoy bubble tea for discount
              forever
            </Text>
            <Container ml="0" mb="10px">
              <Link to="instruction" spy={true} smooth={true} duration={500}>
                <Button
                  borderRadius="50px"
                  border="1px solid #FFFFFF"
                  fontFamily="base"
                  color="#D198E4"
                  bgColor="transparent"
                  filter="drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.25))"
                >
                  Learn more
                </Button>
              </Link>
              <Button
                ml="0.5em"
                borderRadius="50px"
                fontFamily="base"
                fontWeight="bold"
                color="white"
                bgColor="#A75CC1"
                filter="drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.25))"
                onClick={mint}
              >
                Get Now
              </Button>
            </Container>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </Box>
          <Image
            w={{ md: '55%' }}
            src={Hero_image}
            pt={{ base: '60px', xl: '80px' }}
          />
        </Stack>
      </Container>
      <Element name="instruction">
        <Instruction />
      </Element>
    </>
  );
};

export default Landingpage;
