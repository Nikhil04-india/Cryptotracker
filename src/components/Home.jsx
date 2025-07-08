// src/components/Home.jsx
import React from 'react';
import { VStack, SimpleGrid } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';
import HeroSection from './HeroSection';
import MarketOverview from './MarketOverview';
import FeaturesSection from './FeaturesSection';
import InfoCard from './InfoCards';


const Home = () => {
  return (
    <VStack spacing={10}>
      <HeroSection />
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={5}>
        <InfoCard title={<><CheckCircleIcon boxSize="1em" /> F.I.U Registered</>}  />
        <InfoCard title={<><InfoIcon boxSize="1em" /> ISO/IEC</>}/>
      </SimpleGrid>
      <MarketOverview />
      <FeaturesSection />
    </VStack>
  );
};

export default Home;
