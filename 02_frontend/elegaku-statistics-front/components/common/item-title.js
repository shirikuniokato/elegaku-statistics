'use client';
import { Box, Text, Divider } from '@chakra-ui/react';

const Title = (prop) => {
  return (
    <>
      <Box position="relative" mb={4} _before={{ content: '""', position: 'absolute', width: '100%', bottom: -1, background: '#e6e6e6', height: '2px' }}>
        <Text size="sm" display="inline-block" position="relative" _before={{ content: '""', display: 'block', position: 'absolute', bottom: -1, height: '2px', backgroundColor: '#00a3c4', width: '100%', zIndex: '2' }}>
          {prop.title}
        </Text>
      </Box>
    </>
  );
};

export default Title;
