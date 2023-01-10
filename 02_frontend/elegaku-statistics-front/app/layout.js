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
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2514395691765655" crossOrigin="anonymous">
          <ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-2514395691765655" data-ad-slot="9179084232"></ins>
          (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      </body>
    </html>
  );
}
