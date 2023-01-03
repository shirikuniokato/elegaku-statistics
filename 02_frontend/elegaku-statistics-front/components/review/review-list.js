'use client';

// Chakra UI関連
import { Text, Stack } from '@chakra-ui/react';

// その他
import ReviewItem from './review-item';

const ReviewList = (props) => {
  const createItem = () => {
    const result = [];
    props.reviews
      .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))
      .forEach((r) => {
        const targetGirl = props.girls.filter((g) => g.id === r.id)[0];
        result.push(<ReviewItem item={r} girl={targetGirl} />);
      });
    return result;
  };

  return <>{props.reviews.length === 0 ? <Text>口コミがありません</Text> : <Stack>{createItem()}</Stack>}</>;
};

export default ReviewList;
