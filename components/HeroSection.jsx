import React from 'react';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <Box bg="gray.700" color="white" py={{ base: 12, md: 20 }} textAlign="center" w="100%">
      <Heading fontSize={{ base: '2xl', md: '4xl' }} fontWeight="bold" mt={"1.5rem"}>Welcome to CryptoApp</Heading>
      <Text fontSize={{ base: 'lg', md: 'xl' }} mt={4}>Largest Crypto Platform</Text>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} justify="center" mt={6}>
        <Button as={RouterLink} to="/exchanges" colorScheme="teal" size="lg">Exchanges</Button>
        <Button as={RouterLink} to="/coins" colorScheme="teal" variant="outline" size="lg" color={"whitesmoke"}>Coins</Button>
      </Stack>
    </Box>
  );
};

export default HeroSection;
