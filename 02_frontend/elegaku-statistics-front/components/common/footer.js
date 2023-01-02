'use client';

import { useEffect, useState } from 'react';

import { AiFillHome, AiFillBell, AiFillPieChart, AiFillMessage } from 'react-icons/ai';
import { AiOutlineHome, AiOutlineBell, AiOutlinePieChart, AiOutlineMessage, AiOutlineEllipsis } from 'react-icons/ai';
import { Box, Flex, Button, Text, Link } from '@chakra-ui/react';

const FooterButton = (props) => {
  // const labels = ['HOME', '通知', '統計', '口コミ', 'その他'];
  const labels = ['ホーム', '出勤通知', '統計', '口コミ', 'その他'];
  const hrefs = ['/', '/notification', '/statistics', '/review', '/other'];

  return (
    <>
      <Box flex={1}>
        <Link href={hrefs[props.index]}>
          <Button w="100%" borderRadius="0" bgColor="white" flexFlow="column" justifyContent="space-around">
            {props.icons[props.index]}
            <Text fontSize="xs" mt={-0.2}>
              {labels[props.index]}
            </Text>
          </Button>
        </Link>
      </Box>
    </>
  );
};

const getIcons = () => {
  let result = [<AiOutlineHome size={25} />, <AiOutlineBell size={25} />, <AiOutlinePieChart size={25} />, <AiOutlineMessage size={25} />, <AiOutlineEllipsis size={25} />];
  const location = window.location.href;
  const locationArray = location.split('/');
  const locationPath = locationArray[locationArray.length - 1];
  switch (locationPath) {
    case '':
      result[0] = <AiFillHome size={25} />;
      break;
    case 'notification':
      result[1] = <AiFillBell size={25} />;
      break;
    case 'statistics':
      result[2] = <AiFillPieChart size={25} />;
      break;
    case 'review':
      result[3] = <AiFillMessage size={25} />;
      break;
    case 'other':
      // アイコン変更なし
      break;
    default:
      // アイコン変更なし（存在しないケース）
      break;
  }
  return result;
};

const Footer = () => {
  const [icons, setIcons] = useState([]);
  useEffect(() => {
    setIcons(getIcons);
  }, []);

  return (
    <>
      <Flex bg="white" w="100%" h="calc(env(safe-area-inset-bottom) + 51.8px)" position="fixed" bottom="0" borderTop="1px" borderColor="gray.200" pb="env(safe-area-inset-bottom)" justifyContent="center" alignItems="center" zIndex="99">
        <FooterButton index={0} icons={icons} />
        <FooterButton index={1} icons={icons} />
        <FooterButton index={2} icons={icons} />
        <FooterButton index={3} icons={icons} />
        <FooterButton index={4} icons={icons} />
      </Flex>
    </>
  );
};

export default Footer;
