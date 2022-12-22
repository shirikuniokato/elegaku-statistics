'use client';
import '../styles/globals.css';
import styles from '../styles/layout.module.css';
import Link from 'next/link';
import Header from '../components/header';
import { ChakraProvider, Box } from '@chakra-ui/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <ChakraProvider>
          <Header />
          <Box>{children}</Box>
        </ChakraProvider>
      </body>
    </html>
  );
}
