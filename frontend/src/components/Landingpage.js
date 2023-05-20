import React from 'react'
import Navbar from './Navbar'
import { Container, Stack, Box, Heading, Image, Button, Text } from '@chakra-ui/react'
import Hero_image from '../assets/Hero_image.svg'

const Landingpage = () => {
  return (
    <>
        <Navbar/>
        <Container minW='320px' maxW='1920px' w="100%" bgGradient="linear(270deg, rgba(250, 186, 161, 0.68) 0%, rgba(208, 139, 177, 0.841185) 54.2%, #A75CC1 100%)">
          <Stack direction={['column', null, 'row']}>
              <Box  ml='5vw' w={{md: '45%'}} alignSelf='center'>
                <Heading maxW={{ md: '11ch'}} fontSize={[32, null, 64, null, 90]} color='#FEE7D1' fontFamily='base' fontWeight='bold'>
                  Unlimited Bubble Tea Joy
                </Heading>
                <Text mt='1em' mb='2em' ml='1em' maxW='60h' fontSize={[8, 16]} color='white' fontFamily='alt'>
                Invest in a lifetime of happiness with our transferable and resellable gift cards - Buy once, enjoy bubble tea for free forever
                </Text>
                <Container>
                  <Button borderRadius='50px' border='1px solid #FFFFFF' fontFamily='base' color='#D198E4' bgColor='transparent' filter='drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.25))'>Learn more</Button>
                  <Button ml='0.5em' borderRadius='50px' fontFamily='base' fontWeight='bold' color='white' bgColor='#A75CC1' filter='drop-shadow(5px 7px 4px rgba(0, 0, 0, 0.25))'>Get Now</Button>
                </Container>
              </Box>
              <Image w={{md: '55%'}} src={Hero_image}   pt={{base: '60px', xl: '80px'}} />
          </Stack>
        </Container>
    </>
  )
}

export default Landingpage