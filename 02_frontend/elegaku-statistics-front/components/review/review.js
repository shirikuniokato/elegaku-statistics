'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Chakra UI関連
import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

// その他
import Title from '../common/item-title';
import ReviewList from './review-list';
import WriteButton from './write-button';
import Form from './form';
import GirlList from '../statistics/girl/girl-select';
import SkeletonList from './skelton-list';

const Review = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [reviews, setReviews] = useState([]);
  const [girls, setGirls] = useState([]);
  const [targetReviews, setTargetReviews] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [condition, setCondition] = useState('');

  useEffect(() => {
    setIsLoaded(false);
    const request = async () => {
      const response = await axios.get('https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/review/init');
      setReviews(response.data.review.items);
      setTargetReviews(response.data.review.items);
      setGirls(response.data.girl.items);
    };
    request();
    setIsLoaded(true);
  }, []);

  // 検索条件変更時
  useEffect(() => {
    if (condition === '') {
      setTargetReviews(reviews);
    } else {
      setTargetReviews(reviews.filter((r) => r.id === condition));
    }
  }, [condition]);

  return (
    <>
      <Box p="16px">
        <GirlList girls={girls} setId={setCondition} isLoaded={isLoaded} />
        <Box mb={8} />

        <Title title="口コミ一覧" />
        {isLoaded ? <ReviewList reviews={targetReviews} girls={girls} isLoaded={isLoaded} /> : <SkeletonList />}
        <Box mb={8} />
      </Box>
      <Form onClose={onClose} isOpen={isOpen} girls={girls} isLoaded={isLoaded} />
      <WriteButton onOpen={onOpen} />
    </>
  );
};
export default Review;
