import React from 'react';
import { Box, Flex, Link, Stack, Button, Image, useColorMode, useColorModeValue, Icon, Menu, MenuButton, MenuList, MenuItem, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa'; // Import icons for light and dark mode
import WhiteLogo from '../assets/1.png';
import DarkLogo from '../assets/2.png';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800'); // Background color based on color mode
  const color = useColorModeValue('gray.800', 'white'); // Text color based on color mode
  const isMobile = useBreakpointValue({ base: true, md: false }); // Check if screen size is mobile

  return (
    <Box bg={bg} px={6} boxShadow="sm" position="fixed" top={0} left={0} right={0} zIndex="999">
      <Flex h={20} alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Image src={colorMode === 'light' ? WhiteLogo : DarkLogo} alt="CryptoApp Logo" boxSize="14vh" mr={2} />
          <Box fontWeight="bold" fontSize="2rem" color={color}>
            <a href='/'>CryptoApp</a>
          </Box>
        </Flex>
        <Flex alignItems="center">
          {/* Stack of links for larger screens */}
          <Stack direction="row" spacing={4} alignItems="center" display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/" fontWeight="medium" color={color} _hover={{ color: 'blue.500' }}>
              Home
            </Link>

            <Link as={RouterLink} to="/trade" fontWeight="medium" color={color} _hover={{ color: 'blue.500' }}>
              Trade
            </Link>
            
            <Link as={RouterLink} to="/about-us" fontWeight="medium" color={color} _hover={{ color: 'blue.500' }}>
              About Us
            </Link>

            <Link as={RouterLink} to="/support" fontWeight="medium" color={color} _hover={{ color: 'blue.500' }}>
              Support
            </Link>
          </Stack>
        </Flex>
        <Flex alignItems="center">
          {/* Buttons for larger screens */}
          <Button as={RouterLink} to="/create-account" colorScheme="blue" variant="solid" mr={4} size={["sm", "md"]} display={{ base: 'none', md: 'inline-flex' }}>
            Create Account
          </Button>
          <Button as={RouterLink} to="/login" colorScheme="blue" variant="outline" size={["sm", "md"]} display={{ base: 'none', md: 'inline-flex' }}>
            Login
          </Button>
          {/* Toggle color mode button for larger screens */}
          <Button colorScheme="teal" variant="outline" onClick={toggleColorMode} ml={4} display={{ base: 'none', md: 'inline-flex' }}>
            {colorMode === 'light' ? (
              <Icon as={FaMoon} w={[4, 5]} h={[4, 5]} />
            ) : (
              <Icon as={FaSun} w={[4, 5]} h={[4, 5]} />
            )}
          </Button>
          {/* Menu button for smaller screens */}
          {isMobile && (
            <Menu display={{ base: 'inline-flex', md: 'none' }}>
              <MenuButton
                as={IconButton}
                aria-label="More options"
                icon={<Icon as={FaBars} />}
                variant="outline"
                ml=".8rem"
              />
              <MenuList>
                <MenuItem as={RouterLink} to="/create-account">Create Account</MenuItem>
                <MenuItem as={RouterLink} to="/login">Login</MenuItem>
                <MenuItem onClick={toggleColorMode}>
                  {colorMode === 'light' ? (
                    <Icon as={FaMoon} w={5} h={5} mr={2} />
                  ) : (
                    <Icon as={FaSun} w={5} h={5} mr={2} />
                  )}
                  Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
