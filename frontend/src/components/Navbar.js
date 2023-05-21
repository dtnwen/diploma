import React, { useState, useEffect } from 'react'
import { Text, List, Link, Button, Center, Container } from '@chakra-ui/react'
import { isMetamaskInstalled, connectWallet } from '../utils/interact'

const Navbar = ({walletAddress, setWalletAddress}) => {

  useEffect( () => {
    connect()
    addWalletChangeListener()
  }, []) 

  const connect = async () => {
     const wallet = await connectWallet();

     setWalletAddress(wallet)
  }

  const addWalletChangeListener = () => {
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
            if (accounts.length > 0) {
                setWalletAddress(accounts[0])
            } else {
                setWalletAddress("")
            }
        })
    } else {
        // Implement link to install Metamask later
    }
  }

  return (
    <>
        <Container display='flex' minW='320px' maxW='1920px' p='2em 2em' color='white' w='100%' h='5vh' justify='space-between' align='center' alignItems='center' bgGradient="linear(270deg, rgba(250, 186, 161, 0.68) 0%, rgba(208, 139, 177, 0.841185) 54.2%, #A75CC1 100%)">
            <Text flex='1' fontFamily='logo' align='left' fontWeight='bold' fontSize='2em' >Zintea</Text>
            <List fontFamily='base' fontSize='1em' display={['none', null, 'flex']} flex = '3' justifyContent='center' >
                <Link pl='1em' pr='1em'>Home</Link>
                <Link pl='1em' pr='1em'>How it works</Link>
                <Link pl='1em' pr='1em'>About us</Link>
                <Link pl='1em' pr='1em'>FAQ</Link>
            </List>
            <Center flex='1' justifyContent='flex-end'>
                <Button fontFamily='base' fontSize='1em' borderRadius='50px' bgColor='#D08BB1' onClick={connect}>
                {Boolean(walletAddress) ? (
                    "Connected: " + 
                    String(walletAddress).substring(0, 6) +
                        "..." +
                    String(walletAddress).substring(38)
                     //  Implementation drop down > sign out function later
                ) : (
                    <>Sign in</>
                )}
                </Button>                
            </Center>
        </Container>
    </>
  )
}

export default Navbar