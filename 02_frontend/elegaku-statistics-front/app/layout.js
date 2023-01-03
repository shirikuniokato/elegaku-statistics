'use client';
import '../styles/globals.css';
import Header from '../components/common/header';
import TopButton from '../components/common/top-button';
import Footer from '../components/common/footer';

import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from '../styles/theme';
import 'chart.js/auto';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <ChakraProvider theme={theme}>
          <Header />
          <Box bgColor="white">{children}</Box>
          <Box h="150px" />
          <TopButton />
          <Footer />
        </ChakraProvider>
      </body>
    </html>
  );
}
