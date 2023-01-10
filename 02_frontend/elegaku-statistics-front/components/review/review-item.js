'use client';

// Chakra UI関連
import { Flex, Stack, Box, Text, Avatar } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';
import { Image, Heading, StatGroup, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { useDisclosure, Collapse, Link } from '@chakra-ui/react';

import { Icon } from '@chakra-ui/react';
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';

// その他
import Line from '../common/line';
import Radar from '../charts/radar-review';

const ReviewItem = (props) => {
  // showmore制御
  const { isOpen, onToggle } = useDisclosure();

  // タイムスタンプ（登録日時）をyyyy-mm-dd hh:mm形式に変換
  const registerDate = new Date(props.item.timestamp);
  const registerDateStr = `${registerDate.getFullYear()}-${(registerDate.getMonth() + 1).toString().padStart(2, '0')}-${registerDate.getDate().toString().padStart(2, '0')} ${registerDate.getHours().toString().padStart(2, '0')}:${registerDate.getMinutes().toString().padStart(2, '0')}`;

  // 明日香のNoImage画像のみ、スクレイピングの関係上画像が正しく取得できないため、別の画像を表示する
  let image = 'https://cdn-fu-kakumei.com/image/f3503f821ae1bc0a/185/247/.api';
  if (props.girl.image.indexOf('noimage') === -1) {
    image = props.girl.image;
  }

  return (
    <>
      <Card>
        <CardBody>
          <Flex>
            <Stack flex={1} direction="row">
              <Avatar size="sm" src="https://bit.ly/broken-link" />
              <Text>{props.item.userName === '' ? '匿名' : props.item.userName}</Text>
            </Stack>
            <Text flex={1} textAlign="right" fontSize="sm" color="gray.500">{`訪問日：${props.item.visitDate}`}</Text>
          </Flex>

          <Line />

          <Flex borderRadius="md">
            <Image flex="2" borderRadius="md" objectFit="cover" maxW="30%" src={image} alt={props.girl.name} />
            <Box flex="6" mt={3} ml={3} mb={3}>
              <Stack>
                <Heading size="md">{`${props.girl.name}(${props.girl.age})`}</Heading>
                <Text>{props.girl.catch_copy}</Text>
                <Text>{props.girl.three_size}</Text>
              </Stack>
            </Box>
          </Flex>

          <Box mb="3vh"></Box>

          <Stack direction="row">
            <Box>{stars(props.item.score)}</Box>
            <Heading size="md">{props.item.score}</Heading>
          </Stack>
          <Line />

          <Box mb="3vh"></Box>
          <Stack>
            <Radar item={props.item} />
          </Stack>
          <Box mb="3vh"></Box>

          {isOpen ? null : (
            <>
              <Box textAlign="right">
                <Link onClick={onToggle} color="teal.500">
                  続きを見る
                </Link>
              </Box>
            </>
          )}
          {/* defaultでは隠している領域 */}
          <Collapse in={isOpen}>
            <StatGroup>
              <Stat>
                <StatLabel>顔</StatLabel>
                <StatNumber>{props.item.face}点</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>身体</StatLabel>
                <StatNumber>{props.item.body}点</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>愛嬌</StatLabel>
                <StatNumber>{props.item.charm}点</StatNumber>
              </Stat>
            </StatGroup>
            <Box mb="1vh"></Box>
            <StatGroup>
              <Stat>
                <StatLabel>サービス</StatLabel>
                <StatNumber>{props.item.service}点</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>エロ</StatLabel>
                <StatNumber>{props.item.erotic}点</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>テクニック</StatLabel>
                <StatNumber>{props.item.technique}点</StatNumber>
              </Stat>
            </StatGroup>

            <Line />

            {props.item.title === '' && props.item.contents === '' ? (
              <Text>コメント無し</Text>
            ) : (
              <>
                <Heading size="md">{props.item.title === '' ? 'タイトルなし' : props.item.title}</Heading>
                <Box mb="1vh"></Box>
                <Text whiteSpace="pre-line">{props.item.contents}</Text>
              </>
            )}

            <Box mb="1vh"></Box>
          </Collapse>
          {/* defaultでは隠している領域 */}

          <Text mb="-10px" fontSize="xs" color="gray.500">{`投稿日時：${registerDateStr}`}</Text>
        </CardBody>
      </Card>
    </>
  );
};
export default ReviewItem;

const stars = (score) => {
  const result = [];

  const isZero = score === 0.0;
  const isFive = score === 5.0;
  const isFloat = !Number.isInteger(score);

  for (let i = 0; i < 5; i++) {
    const target = i + 1;

    if (isZero) {
      result.push(<Icon as={ImStarEmpty} key={i} color="#df9b56" bg="" w={6} h={6} />);
      continue;
    }
    if (isFive) {
      result.push(<Icon as={ImStarFull} key={i} color="#df9b56" bg="" w={6} h={6} />);
      continue;
    }

    if (target <= Math.floor(score)) {
      result.push(<Icon as={ImStarFull} key={i} color="#df9b56" bg="" w={6} h={6} />);
      continue;
    }

    if (target === Math.ceil(score) && isFloat) {
      result.push(<Icon as={ImStarHalf} key={i} color="#df9b56" bg="" w={6} h={6} />);
    } else if (target > score) {
      result.push(<Icon as={ImStarEmpty} key={i} color="#df9b56" bg="" w={6} h={6} />);
    }
  }
  return result;
};
