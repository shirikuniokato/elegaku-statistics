'use client';
import { Box, Link } from '@chakra-ui/react';

export default function Header() {
  return (
    <>
      <Box bg="#1c00a2" w="100%" h="6vh" color="white">
        <Link href="/">エレガンス学院-出勤統計</Link>
      </Box>
    </>
  );
}
