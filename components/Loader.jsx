import { Box, Spinner, VStack, Text, keyframes, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = () => {
  const spinnerColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <VStack h="90vh" justifyContent="center" alignItems="center" spacing={4}>
      <Box
        as="div"
        w={["100px", "120px", "150px"]}
        h={["100px", "120px", "150px"]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, teal.500, green.500, blue.500, purple.500)"
        borderRadius="50%"
        animation={`${spin} 1.5s linear infinite`}
      >
        <Spinner size="xl" color="white" />
      </Box>
      <Text fontSize={["md", "lg", "xl"]} fontWeight="bold" color={spinnerColor}>
        Loading, please wait...
      </Text>
    </VStack>
  );
};

export default Loader;
