import { useState, useEffect } from 'react';

// ライブラリ
import { Box } from '@chakra-ui/react';
// その他
import Line from '../common/line';
import GirlList from '../search/girl-select';
import GirlInfo from '../girl-info';

import axios from 'axios';

const StatisticsGirl = () => {
  const [id, setId] = useState('');
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
      <GirlList setId={setId} girls={girls} />
      <Box m={8} />
      <Line />
      <GirlInfo id={id} />
    </>
  );
};

export default StatisticsGirl;
