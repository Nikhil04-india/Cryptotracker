// src/components/Card.jsx
import React from 'react';
import { Box, Text, Stack } from '@chakra-ui/react';

const InfoCard = ({ title }) => {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="md"
      p={5}
      textAlign="center"
      maxW="sm"
      mx="auto"
    >
      <Stack spacing={4}>
        <Text fontWeight="bold" fontSize="xl" color="gray.700">
          {title}
        </Text>
      </Stack>
    </Box>
  );
};

export default InfoCard;
