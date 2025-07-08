import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Heading, Image, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';

const MarketOverview = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            price_change_percentage: '1h,24h', // Include percentage change data for 1 hour and 24 hours
          },
        });
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coins data", error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box p={5} w="100%">
      <Heading mb={5}>Market Overview</Heading>
      <Table variant={"expert"}>
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>Name</Th>
            {!isMobile && (
              <>
                <Th>1h Change</Th>
                <Th>24h Change</Th>
                <Th>Market Cap</Th>
                <Th>Volume (24h)</Th>
              </>
            )}
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coins.map((coin) => (
            <Tr key={coin.id}>
              <Td>{coin.market_cap_rank}</Td>
              <Td>
                <Image src={coin.image} alt={coin.name} boxSize="24px" mr={2} display="inline-block" />
                {coin.name}
              </Td>
              {!isMobile && (
                <>
                  <Td color={coin.price_change_percentage_1h_in_currency > 0 ? 'green.400' : 'red.400'} fontWeight={"bold"}>
                    {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                  </Td>
                  <Td color={coin.price_change_percentage_24h > 0 ? 'green.400' : 'red.400'} fontWeight={"bold"}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </Td>
                  <Td>${coin.market_cap.toLocaleString()}</Td>
                  <Td>${coin.total_volume.toLocaleString()}</Td>
                </>
              )}
              <Td>${coin.current_price.toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MarketOverview;
