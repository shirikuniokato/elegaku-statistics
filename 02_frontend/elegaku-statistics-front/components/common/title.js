'use client';
import { Box, Text } from '@chakra-ui/react';

const Title = (prop) => {
  return (
    <>
      <Text size="sm">{prop.title}</Text>
      <Box m="1vh" />
    </>
  );
};

export default Title;
