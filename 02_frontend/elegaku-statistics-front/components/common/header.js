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
      <Box bg="linear-gradient(to right, #67b26f, #4ca2cd)" w="100%" h="6vh" color="white" position="fixed" zIndex="99" shadow="md" textAlign="center">
        {/* <Box bg="#009688" w="100%" h="6vh" color="white" position="fixed" zIndex="99" shadow="md" textAlign="center"> */}
        <Heading size="xs" onClick={returnTop} lineHeight="6vh">
          エレガンス学院-非公式
        </Heading>
      </Box>
      <Box mt="6vh"></Box>
    </>
  );
};

export default Header;
