import { useState } from 'react';
// ライブラリ
import { Box } from '@chakra-ui/react';
// その他
import Line from '../common/line';
import GirlList from '../search/girl-select';
import GirlInfo from '../girl-info';

const StatisticsGirl = () => {
  const [id, setId] = useState('');

  return (
    <>
      <GirlList setId={setId} />
      <Box m={8} />
      <Line />
      <GirlInfo id={id} />
    </>
  );
};

export default StatisticsGirl;
