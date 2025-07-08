import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, Text, VStack } from '@chakra-ui/react';

const CoinCard = ({ id, name, img, rank, price, symbol, currencySymbol = "₹" }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={{ base: "full", md: "48" }} // Adjust width for responsiveness
      shadow={"lg"}
      p={"4"} // Adjust padding for responsiveness
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Coin"}
      />
      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{rank}</Text>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : 'NA'}</Text>
    </VStack>
  </Link>
);

export default CoinCard;
