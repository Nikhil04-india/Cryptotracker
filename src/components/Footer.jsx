// src/components/Footer.jsx
import React from 'react';
import { Box, Text, Stack, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.800" color="white" py={10}>
      <Stack direction="row" spacing={4} justify="center">
        <Link href="#" color="white">About</Link>
        <Link href="#" color="white">Contact</Link>
        <Link href="#" color="white">Privacy Policy</Link>
      </Stack>
      <Text textAlign="center" mt={4}>© 2024 CryptoApp. All rights reserved.</Text>
      <Text textAlign="center" mt={4}>© MadeBy Nikhil Agarwal.</Text>


    </Box>
  );
};

export default Footer;
