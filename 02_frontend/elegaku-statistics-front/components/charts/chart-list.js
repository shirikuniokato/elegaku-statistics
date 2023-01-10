'use client';

// ライブラリ
import { Box, Skeleton, Text } from '@chakra-ui/react';

// スライダー関連
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// グラフ関連
import ChartAllTime from './chart-all-time';
import PieTime from './pie-time';
import PieDays from './pie-days';

const ChartList = (props) => {
  console.log(props);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {props.attendances.count === 0 ? (
        <Box>
          <Skeleton isLoaded={props.isLoaded}>
            <Text w="350px" h="350px">
              データが存在しません。
            </Text>
          </Skeleton>
        </Box>
      ) : (
        <Box>
          <Skeleton isLoaded={props.isLoaded}>
            <Slider {...settings}>
              <PieDays attendancesMonth={props.attendancesMonth.items} />
              <PieTime attendancesMonth={props.attendancesMonth.items} />
              <ChartAllTime attendances={props.attendances.items} ym={props.ym} />
            </Slider>
          </Skeleton>
        </Box>
      )}
    </>
  );
};

export default ChartList;
