import { useState, useEffect } from 'react';

// ライブラリ
import { Box } from '@chakra-ui/react';
// その他
import Line from '../common/line';
import GirlList from '../search/girl-select';
import GirlInfo from '../girl-info';

import axios from 'axios';

export function useAsyncEffect(asyncFunc, deps) {
  useEffect(() => {
    (async () => {
      asyncFunc();
    })();
  }, deps);
}

const StatisticsGirl = () => {
  const [id, setId] = useState('');
  const [girls, setGirls] = useState({});

  useAsyncEffect(async () => {
    const response = await axios.get('https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/girl');
    console.log(response);
    setGirls(response.data);
  }, []);

  console.log(`girls-カスタムフック`);
  console.log(girls);

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
