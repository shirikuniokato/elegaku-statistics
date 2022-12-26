'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Data from './data.json';
import { Box } from '@chakra-ui/react';

import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

// const requestUrl =
//   'https://9gj8mh3669.execute-api.ap-northeast-1.amazonaws.com/items';

export default function AttendanceInformations() {
  const [post, setPost] = useState(null);

  React.useEffect(() => {
    // axios
    //   .get(requestUrl)
    //   .then((response) => {
    //     setPost(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // const result = null;
    // Data.Items.forEach((item) => {
    //     if (item.start === '') return;

    //   console.log(item);
    // })

    setPost(Data);
  }, []);

  if (!post) return null;

  return (
    <>
      <Box>{post.Count}</Box>
    </>
  );
}
