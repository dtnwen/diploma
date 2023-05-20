import React from 'react'
import { Text, List, ListItem, Button, Center, Container } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <>
        <Container display='flex' minW='320px' maxW='1920px' p='1em 2em' color='white' w='100%' h='52px' justify='space-between' align='center' alignItems='center' bgGradient="linear(270deg, rgba(250, 186, 161, 0.68) 0%, rgba(208, 139, 177, 0.841185) 54.2%, #A75CC1 100%)">
            <Text flex='1' fontFamily='logo' align='left' fontWeight='bold' fontSize='2em' >Zintea</Text>
            <List fontFamily='base' fontSize='1em' display={['none', null, 'flex']} flex = '3' justifyContent='center' >
                <ListItem pl='1em' pr='1em'>Home</ListItem>
                <ListItem pl='1em' pr='1em'>How it works</ListItem>
                <ListItem pl='1em' pr='1em'>About us</ListItem>
                <ListItem pl='1em' pr='1em'>FAQ</ListItem>
            </List>
            <Center flex='1' justifyContent='flex-end'>
                <Button fontFamily='base' fontSize='1em' borderRadius='50px' bgColor='#D08BB1'> Sign in</Button>
            </Center>
        </Container>
    </>
  )
}

export default Navbar