'use client';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const PageTitle = (prop) => {
  return (
    <>
      <Flex h="10vh">
        <Text m="auto" fontWeight="bold" fontSize="xl">
          {prop.title}
        </Text>
      </Flex>
    </>
  );
};

export default PageTitle;
