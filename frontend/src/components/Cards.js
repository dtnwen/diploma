import React from 'react';
import {
  Link,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Heading,
  Divider,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const Cards = ({ nftsOwn }) => {
  return (
    <>
      <Card maxW="20rem">
        <CardHeader>
          <Heading fontSize="2em" color="#D08BB1" fontFamily="base">
            {nftsOwn.title}
          </Heading>
          <Divider />
        </CardHeader>

        <CardBody pt="0">
          <Image src={nftsOwn.media[0].gateway} alt="NFT image" />
          <Text m="1em 0 1em 0" fontFamily="alt">
            {nftsOwn.description}
          </Text>
          <Divider />
          <Text as="h1">Attributes:</Text>
          <UnorderedList>
            <ListItem fontFamily="alt">id: {nftsOwn.tokenId}</ListItem>
            <ListItem fontFamily="alt">
              value: {nftsOwn.rawMetadata.attributes[0].value}{' '}
            </ListItem>
          </UnorderedList>
        </CardBody>

        <CardFooter>
          <Button
            as={Link}
            href={
              'https://sepolia.etherscan.io/address/' + nftsOwn.contract.address
            }
            isExternal
          >
            View on etherscan <ExternalLinkIcon mx="2px" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Cards;
