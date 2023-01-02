'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Chakra UI関連
import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

// その他
import Title from '../common/item-title';
import WriteButton from './write-button';
import Form from './form';

const Review = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [girls, setGirls] = useState([]);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get('https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/girl');
      setGirls(response.data.Items);
    };
    request();
  }, []);

  return (
    <>
      <Box p="16px">
        <Title title="最近の口コミ" />
        <Box mb={8} />

        <Title title="生徒一覧" />
        <Box mb={8} />

        <Form onClose={onClose} isOpen={isOpen} girls={girls} />
        <Box mb={8} />
      </Box>
      <WriteButton onOpen={onOpen} />
    </>
  );
};
export default Review;
