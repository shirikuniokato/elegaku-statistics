'use client';

import React from 'react';
import { Text, Box, Image } from '@chakra-ui/react';
import { Flex, Stack, Heading, Link } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import Title from './common/title';

const GirlInfo = (props) => {
  // props.idが空の場合は何も表示しない
  if (props.id === '') {
    return (
      <>
        <Title title="生徒詳細" />
        <Text>生徒を選択してください。</Text>
      </>
    );
  }

  const targetData = props.girls.filter((item) => item.id === props.id);
  if (targetData.length > 0) {
    // 特定成功
    const info = targetData[0];

    // 明日香のNoImage画像のみ、スクレイピングの関係上画像が正しく取得できないため、別の画像を表示する
    let image = 'https://cdn-fu-kakumei.com/image/f3503f821ae1bc0a/185/247/.api';
    if (info.image.indexOf('noimage') === -1) {
      image = info.image;
    }

    return (
      <>
        <Title title="生徒詳細" />
        <Link href={`https://www.elegaku.com/profile/top/castCode/${info.id}/`} textDecoration="none" isExternal>
          <Flex border="1px" borderColor="gray.200" borderRadius="md" shadow="md">
            <Image flex="2" borderTopLeftRadius="md" borderBottomLeftRadius="md" objectFit="cover" maxW="30%" src={image} alt={info.name} />
            <Box flex="6" mt={3} ml={3} mb={3}>
              <Stack>
                <Heading size="md">{`${info.name}(${info.age})`}</Heading>
                <Text>{info.catch_copy}</Text>
                <Text>{info.three_size}</Text>
              </Stack>
            </Box>
            <Box flex="1" alignSelf="flex-end" align="right" p={1}>
              <ExternalLinkIcon mx="2px" />
            </Box>
          </Flex>
        </Link>
      </>
    );
  } else {
    // 特定失敗
    return (
      <>
        <Title title="生徒詳細" />
        <Box m="1vh" />
        <Text color="red">生徒が見つかりませんでした。</Text>
      </>
    );
  }
};

export default GirlInfo;
