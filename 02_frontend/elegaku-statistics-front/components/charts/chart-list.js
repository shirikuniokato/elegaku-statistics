'use client';

// ライブラリ
import { Box, Skeleton } from '@chakra-ui/react';

// スライダー関連
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// グラフ関連
import ChartAllTime from './chart-all-time';
import PieTime from './pie-time';
import PieDays from './pie-days';

const ChartList = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Box>
        <Skeleton isLoaded={props.isLoaded}>
          <Slider {...settings}>
            <PieDays attendancesMonth={props.attendancesMonth} />
            <PieTime attendancesMonth={props.attendancesMonth} />
            <ChartAllTime attendances={props.attendances} ym={props.ym} />
          </Slider>
        </Skeleton>
      </Box>
    </>
  );
};

export default ChartList;
