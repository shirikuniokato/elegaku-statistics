'use client';
import '../styles/globals.css';
import Header from '../components/layout/header';
import TopButton from '../components/layout/top-button';
import { ChakraProvider, Box } from '@chakra-ui/react';
import theme from '../styles/theme';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <ChakraProvider theme={theme}>
          <Header />
          <Box>{children}</Box>
          <TopButton />
          <Box h="53px"></Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
