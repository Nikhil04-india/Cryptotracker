import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, HStack, Radio, RadioGroup, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "usd" ? "$" : "€";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent message={"Error While Fetching Coins"} />;

  return (
    <Container maxW={"container.xl"} mt={"5rem"}>
      {loading ? (
        <Loader />
      ) : (
        <VStack spacing={8} align="stretch">
          <RadioGroup value={currency} onChange={setCurrency} p={8}>
            <HStack spacing={4}>
              <Radio value="inr">INR(₹)</Radio>
              <Radio value="usd">USD($)</Radio>
              <Radio value="eur">EUR(€)</Radio>
            </HStack>
          </RadioGroup>

          <HStack spacing={8} flexWrap="wrap" justifyContent="space-evenly">
            {coins.map((coin) => (
              <CoinCard
                id={coin.id}
                key={coin.id}
                name={coin.name}
                img={coin.image}
                price={coin.current_price}
                symbol={coin.symbol}
                rank={coin.trust_score_rank}
                url={coin.url}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w="full" overflowX="auto" padding={8}>
            {btns.map((item, index) => (
              <Button
                key={index}
                bgColor="blackAlpha.900"
                color="white"
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </VStack>
      )}
    </Container>
  );
};

export default Coins;
