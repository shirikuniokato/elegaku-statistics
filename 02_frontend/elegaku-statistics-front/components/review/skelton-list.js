'use client';

// Chakra UI関連
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import { Flex, Avatar, Card, CardBody, Box, Stack, Text } from '@chakra-ui/react';

import Line from '../common/line';

const SkeletonList = () => {
  const result = [];

  for (let i = 0; i < 5; i++) {
    result.push(
      <>
        <Card>
          <CardBody>
            <Flex>
              <Stack flex={1} direction="row">
                <SkeletonCircle size="10" />
              </Stack>
              <Text flex={1} textAlign="right" fontSize="sm" color="gray.500"></Text>
            </Flex>
            <Line />
            <Stack>
              <Skeleton h="15vh" />
              <Skeleton h="35vh" />
            </Stack>
            <SkeletonText mt="4" noOfLines={6} spacing="4" skeletonHeight="2" />
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      <Stack>{result}</Stack>
    </>
  );
};

export default SkeletonList;
