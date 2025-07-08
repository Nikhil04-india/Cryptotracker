import React, { useEffect, useState } from 'react';
import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Img, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import { server } from '../index';
import Chart from './Chart'; // Update the import

const CoinsDetails = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'usd' ? '$' : '€';
  
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id, currency, days]);

  if (error) return <ErrorComponent message="Error While Fetching Coin" />;

  return (
    <Container maxW="container.xl">
      {loading ? <Loader /> : (
        <>
        <Box mt="7rem" width="full" borderWidth={1}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>
          <HStack p="4" overflowX="auto">
            {btns.map((i) => (
              <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
            ))}
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p="8">
            <HStack spacing="4">
              <Radio value="inr">INR(₹)</Radio>
              <Radio value="usd">USD($)</Radio>
              <Radio value="eur">EUR(€)</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing="4" p="16" alignItems="flex-start">
            <Text fontSize="small" alignSelf="center" opacity={0.7}>
              Last Updated On {new Date(coin.market_data?.last_updated).toLocaleString()}
            </Text>

            <Img src={coin.image?.large} w="16" h="16" fit="contain" />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}{coin.market_data?.current_price[currency]?.toLocaleString()}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data?.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                {coin.market_data?.price_change_percentage_24h}% in last 24 hours
              </StatHelpText>
            </Stat>

            <Badge fontSize="2xl" bgColor="blackAlpha.800" color="white">
              {`#${coin.market_data?.market_cap_rank}`}
            </Badge>

            <CustomBar high={`${currencySymbol}${coin.market_data?.high_24h[currency]?.toLocaleString()}`} low={`${currencySymbol}${coin.market_data?.low_24h[currency]?.toLocaleString()}`} />

            <Box w="full" p="4">
              <Item title="Max Supply" value={coin.market_data?.max_supply?.toLocaleString()} />
              <Item title="Circulating Supply" value={coin.market_data?.circulating_supply?.toLocaleString()} />
              <Item title="Market Cap" value={`${currencySymbol}${coin.market_data?.market_cap[currency]?.toLocaleString()}`} />
              <Item title="All Time Low" value={`${currencySymbol}${coin.market_data?.atl[currency]?.toLocaleString()}`} />
              <Item title="All Time High" value={`${currencySymbol}${coin.market_data?.ath[currency]?.toLocaleString()}`} />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => (
  <VStack w="full">
    <Progress value={50} colorScheme="teal" w="full" />
    <HStack justifyContent="space-between" w="full">
      <Badge children={low} colorScheme="red" />
      <Text fontSize="small">24H Range</Text>
      <Badge children={high} colorScheme="green" />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent="space-between" w="full" my="4" spacing={1}>
    <Text fontFamily="Bebas Neue" letterSpacing="widest">{title}</Text>
    <Text fontWeight="bold">{value}</Text>
  </HStack>
);

export default CoinsDetails;
