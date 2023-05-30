import {
  Container,
  Stack,
  Heading,
  Image,
  VStack,
  Box,
  Center,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react';
import React from 'react';
import NFT1 from '../assets/NFT1.svg';

const Instruction = () => {
  return (
    <>
      <Container
        pb="2em"
        minW="350px"
        maxW="1920px"
        w="100%"
        bgGradient="linear-gradient(253.17deg, #E99E4B 0%, rgba(250, 186, 161, 0.510417) 74.96%, rgba(247, 193, 132, 0) 100%);"
      >
        <Center>
          <Heading
            m="0.7em"
            fontFamily="base"
            fontWeight="bold"
            fontSize="64px"
            color="white"
          >
            How it works
          </Heading>
        </Center>
        <Stack
          direction={['column', null, null, 'row']}
          spacing="30px"
          alignItems="center"
        >
          <Image src={NFT1} flex="3" boxSize="30em" />
          <Accordion defaultIndex={[0]} flex="2" color="white" allowToggle>
              <AccordionItem >
                <Heading>
                  <AccordionButton>
                    <Heading flex="1" size={['sm', 'md', 'lg', 'xl']} textAlign="left">
                      Step 1: Purchase the NFT
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>

                <AccordionPanel>
                  You need to pay 0.25 ETH to mint a NFT
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <Heading>
                  <AccordionButton>
                    <Heading flex="1" size={['sm', 'md', 'lg', 'xl']} textAlign="left">
                      Step 2: Receive the NFT
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel>
                  After purchasing, you'll receive the NFT in your digital
                  wallet. You'll also receive a unique code that will be
                  regenerated each time the NFT is transferred.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <Heading>
                  <AccordionButton>
                    <Heading flex="1" size={['sm', 'md', 'lg', 'xl']} textAlign="left">
                      Step 3: Redeem the NFT
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel>
                  Present the code at the bubble tea shop and enjoy your free
                  bubble tea.
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <Heading>
                  <AccordionButton>
                    <Heading flex="1" size={['sm', 'md', 'lg', 'xl']} textAlign="left">
                      Step 4: Enjoy unlimited bubble tea:
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel>
                  As long as you own the NFT, you'll have unlimited access to
                  free bubble tea at the shop. So sit back, relax, and enjoy!
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <Heading>
                  <AccordionButton>
                    <Heading flex="1" size={['sm', 'md', 'lg', 'xl']} textAlign="left">
                      Note: Sell or transfer the NFT{' '}
                    </Heading>
                    <AccordionIcon />
                  </AccordionButton>
                </Heading>
                <AccordionPanel>
                  If you no longer wish to enjoy unlimited bubble teas, you can
                  sell or transfer the NFT to someone else.
                </AccordionPanel>
              </AccordionItem>
          </Accordion>
        </Stack>
      </Container>
    </>
  );
};

export default Instruction;
