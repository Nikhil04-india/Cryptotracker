import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, HStack, Heading, VStack, Text, Box } from '@chakra-ui/react';
import Loader from './Loader';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <ErrorComponent message={"Error While Fetching Exchanges"} />;

  return (
    <Container maxW={"container.xl"} mt={"4rem"} p={[4, 8]}>
      {loading ? <Loader /> : (
        <HStack wrap={"wrap"} justifyContent={"space-evenly"} spacing={4}>
          {exchanges.map((i) => (
            <ExchangeCard
              key={i.id}
              name={i.name}
              img={i.image}
              rank={i.trust_score_rank}
              url={i.url}
            />
          ))}
        </HStack>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"_blank"} rel="noopener noreferrer">
    <VStack
      w={["full", "52"]}
      shadow={"lg"}
      p={["4", "8"]}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={["2", "4"]}
      css={{
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Box w={["16", "20"]} h={["16", "20"]} display="flex" alignItems="center" justifyContent="center">
        <img
          src={img}
          alt={"Exchange"}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Box>
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
