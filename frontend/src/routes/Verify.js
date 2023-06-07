import { Network, Alchemy } from 'alchemy-sdk';
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
import { codeVerify, validHex, ownerVerify } from '../utils/promocode';

const CONTRACT_ADDRESS = '0x53CFBAa67156102220DDf3a1a9452A9600aB0654';
const settings = {
  apiKey: process.env.REACT_APP_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

const Verify = () => {
  const [showLoader, setShowLoader] = useState(null);
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(null);
  const isError = !validHex(first) || !validHex(last) || !validHex(code);

  const date = new Date();

  const setState = state => evt => state(evt.target.value);

  const verify = () => {
    try {
      if (ownerVerify) {
        setShowLoader(true);
        const userEnd = codeVerify(first, last).slice(2, 6);
        console.log(userEnd);
        if (userEnd === code) {
          setVerified(true);
        } else {
          setVerified(false);
        }
        setShowLoader(false);
      } else setVerified(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <FormControl mb="1.5em" isRequired>
          <FormLabel>First 4 character of wallet address</FormLabel>
          <InputGroup>
            <InputLeftAddon children="0x" />
            <Input
              value={first}
              placeholder="eg: 23f6"
              onChange={setState(setFirst)}
            />
          </InputGroup>
        </FormControl>

        <Divider />
        <FormControl mb="1.5em" isRequired>
          <FormLabel>Last 4 character of wallet address</FormLabel>
          <Input
            value={last}
            placeholder="eg: f7e3"
            onChange={setState(setLast)}
          />
        </FormControl>

        <Divider />
        <FormControl mb="1.5em" isRequired>
          <FormLabel>Code</FormLabel>
          <Input
            value={code}
            placeholder="eg: f2ee"
            onChange={setState(setCode)}
          />
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
          <Alert mt="1em" status={verified ? 'success' : 'error'}>
            <AlertIcon />
            {verified ? 'Verified' : 'Verification failed!'}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Verify;
