'use client';
import { Box, Heading } from '@chakra-ui/react';

const Header = () => {
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Box bg="#009688" w="100%" h="6vh" color="white" position="fixed" zIndex="99" shadow="md" textAlign="center">
        <Heading size="md" onClick={returnTop} lineHeight="6vh">
          エレガンス学院-出勤統計
        </Heading>
      </Box>
      <Box mt="6vh"></Box>
    </>
  );
};

export default Header;
