import React, { useState } from 'react';
import { utils } from 'ethers';
import { UnlockIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputLeftAddon,
  InputGroup,
  Container,
  Divider,
  Text,
  Heading,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

const Verify = () => {
  const [showLoader, setShowLoader] = useState(null);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(null);
  const isError = first === '' || last === '' || code === '';

  const date = new Date();

  const setState = state => evt => state(evt.target.value);

  const verify = () => {
    setShowLoader(true);
    const userEnd = utils
      .keccak256(date.getHours(), first, date.getDate(), last)
      .slice(2, 7);
    console.log(userEnd);
    if (userEnd === code) {
      setVerified(true);
    } else {
      setVerified(false);
    }
    setShowLoader(false);
  };
  return (
    <>
      <Container>
        <FormControl mb="1.5em" isRequired>
          <FormLabel>First 3 character of wallet address</FormLabel>
          <InputGroup>
            <InputLeftAddon children="0x" />
            <Input placeholder="eg: 2f6" onChange={setState(setFirst)} />
          </InputGroup>
        </FormControl>

        <Divider />
        <FormControl mb="1.5em" isRequired>
          <FormLabel>Last 4 character of wallet address</FormLabel>
          <Input placeholder="eg: f7e3" onChange={setState(setLast)} />
        </FormControl>

        <Divider />
        <FormControl mb="1.5em" isRequired>
          <FormLabel>Code</FormLabel>
          <Input placeholder="eg: f2ee1" onChange={setState(setCode)} />
        </FormControl>

        <Button
          leftIcon={<UnlockIcon />}
          isLoading={showLoader}
          loadingText="Verifying"
          onClick={verify}
          isDisabled={isError}
        >
          Verify
        </Button>
        {verified !== null && (
          <Alert mt='1em'status={verified ? 'success' : 'error'}>
            <AlertIcon />
            {verified ? 'Verified' : 'Verification failed!'}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Verify;
