// src/components/FeaturesSection.jsx
import React from 'react';
import { Box, Heading, Text, SimpleGrid, Stack, Image, useColorMode, useColorModeValue } from '@chakra-ui/react';
import WhiteLogo from '../assets/1.png';
import DarkLogo from '../assets/2.png';

const FeaturesSection = () => {
  const { colorMode } = useColorMode(); // Destructure colorMode from useColorMode hook
  const bg = useColorModeValue('white', 'gray.800'); // Background color based on color mode
  const color = useColorModeValue('gray.800', 'white'); // Text color based on color mode

  return (
    <Box p={10} w="100%" bg={bg} color={color}>
      <SimpleGrid columns={{ base: 1, md: 0 }} spacing={1} px={10}>
        <Image src={colorMode === 'light' ? WhiteLogo : DarkLogo} alt="CryptoApp Logo" boxSize="24vh" mr={2} />
        <Heading mb={5} textAlign="center">
          Features
        </Heading>
      </SimpleGrid>
      <br />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Stack spacing={3}>
          <Heading size="md">Real-time Data</Heading>
          <Text>Get real-time cryptocurrency data and market updates.</Text>
        </Stack>
        <Stack spacing={3}>
          <Heading size="md">Secure Transactions</Heading>
          <Text>Experience secure and fast transactions with our platform.</Text>
        </Stack>
        <Stack spacing={3}>
          <Heading size="md">Comprehensive Analytics</Heading>
          <Text>Analyze the market trends with our comprehensive analytics tools.</Text>
        </Stack>
      </SimpleGrid>
    </Box>
  );
};

export default FeaturesSection;
