'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { Box, Divider, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { Flex, Image, Stack, Heading, Text, Textarea } from '@chakra-ui/react';
import { Slider, SliderTrack, SliderFilledTrack, SliderMark, SliderThumb } from '@chakra-ui/react';

import { Icon } from '@chakra-ui/react';
import { ImStarEmpty, ImStarHalf, ImStarFull } from 'react-icons/im';

import Title from '../common/item-title';
import GirlList from '../statistics/girl/girl-select';

const marks = () => {
  return (
    <>
      <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
        10点
      </SliderMark>
      <SliderMark value={30} mt="1" ml="-2.5" fontSize="sm">
        30点
      </SliderMark>
      <SliderMark value={50} mt="1" ml="-2.5" fontSize="sm">
        50点
      </SliderMark>
      <SliderMark value={70} mt="1" ml="-2.5" fontSize="sm">
        70点
      </SliderMark>
      <SliderMark value={90} mt="1" ml="-2.5" fontSize="sm">
        90点
      </SliderMark>
    </>
  );
};

const stars = (score) => {
  const result = [];

  const isZero = score === 0.0;
  const isFive = score === 5.0;
  const isFloat = !Number.isInteger(score);

  for (let i = 0; i < 5; i++) {
    const target = i + 1;

    if (isZero) {
      result.push(<Icon as={ImStarEmpty} key={i} color="#df9b56" bg="" w={12} h={12} />);
      continue;
    }
    if (isFive) {
      result.push(<Icon as={ImStarFull} key={i} color="#df9b56" bg="" w={12} h={12} />);
      continue;
    }

    if (target <= Math.floor(score)) {
      result.push(<Icon as={ImStarFull} key={i} color="#df9b56" bg="" w={12} h={12} />);
      continue;
    }

    if (target === Math.ceil(score) && isFloat) {
      result.push(<Icon as={ImStarHalf} key={i} color="#df9b56" bg="" w={12} h={12} />);
    } else if (target > score) {
      result.push(<Icon as={ImStarEmpty} key={i} color="#df9b56" bg="" w={12} h={12} />);
    }
  }
  return result;
};

const Form = (props) => {
  // 対象生徒
  const [id, setId] = useState('');
  const [girl, setGirl] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  // フォーム入力値
  // yyyy-mm-dd形式に変換（訪問時のDefaultに使用）
  const date = new Date();
  const today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

  const [userName, setUserName] = useState('');
  const [visitDate, setVisitDate] = useState(today);
  const [face, setFace] = useState(50);
  const [body, setBody] = useState(50);
  const [charm, setCharm] = useState(50);
  const [service, setService] = useState(50);
  const [erotic, setErotic] = useState(50);
  const [technique, setTechnique] = useState(50);
  const [score, setScore] = useState(2.5);
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  const calcScore = () => {
    setScore((((face + body + charm + service + erotic + technique) / 6) * 0.05).toFixed(1));
  };

  const toast = useToast();
  const toastConfig = {
    duration: 3000,
    isClosable: true,
    containerStyle: {
      marginBottom: 'calc(env(safe-area-inset-bottom) + 70px)',
    },
  };

  const submit = () => {
    const data = {
      id: id,
      userName: userName,
      visitDate: visitDate,
      face: face,
      body: body,
      charm: charm,
      service: service,
      erotic: erotic,
      technique: technique,
      score: score,
      title: title,
      contents: contents,
    };
    const request = async () => {
      try {
        await axios.post('https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/review/add', data);
      } catch (error) {
        toast({
          title: '投稿に失敗しました。',
          status: 'error',
          ...toastConfig,
        });
        return;
      }
      toast({
        title: '投稿に成功しました。',
        status: 'info',
        ...toastConfig,
      });
      props.onClose();
      initializeForm();
    };
    request();
  };

  const initializeForm = () => {
    // フォームの初期値設定
    setUserName('');
    setVisitDate(today);
    setFace(50);
    setBody(50);
    setCharm(50);
    setService(50);
    setErotic(50);
    setTechnique(50);
    setScore(2.5);
    setTitle('');
    setContents('');
  };

  // スライダーの設定
  const sliderOptions = {
    w: '86%',
    ml: '7%',
    mr: '7%',
    ariaLabel: 'face',
    colorScheme: 'teal',
    defaultValue: 50,
    onChangeEnd: calcScore,
  };

  // 生徒選択時
  useEffect(() => {
    // 未選択に戻した場合
    if (id === '') {
      setIsSelected(false);
      return;
    }

    // 生徒情報の取得・設定
    const targetData = props.girls.filter((g) => g.id === id);
    const info = targetData[0];
    // 明日香のNoImage画像のみ、スクレイピングの関係上画像が正しく取得できないため、別の画像を表示する
    if (info.image.indexOf('noimage') !== -1) {
      info.image = 'https://cdn-fu-kakumei.com/image/f3503f821ae1bc0a/185/247/.api';
    }
    setGirl(info);

    initializeForm();
    setIsSelected(true);
  }, [id]);

  return (
    <>
      <Modal
        size="full"
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
          initializeForm();
          setId('');
          setIsSelected(false);
        }}
        closeOnEsc={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>投稿フォーム</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <GirlList setId={setId} girls={props.girls} isLoaded={props.isLoaded} />
            <Box m={8} />
            <Title title="生徒詳細" />
            {!isSelected ? (
              <Text>生徒を選択してください。</Text>
            ) : (
              <>
                <Flex border="1px" borderColor="gray.200" borderRadius="md" shadow="md">
                  <Image flex="1" borderTopLeftRadius="md" borderBottomLeftRadius="md" objectFit="cover" maxW="30%" src={girl.image} alt={girl.name} />
                  <Box flex="4" mt={3} ml={3} mb={3}>
                    <Stack>
                      <Heading size="md">{`${girl.name}(${girl.age})`}</Heading>
                      <Text>{girl.catch_copy}</Text>
                      <Text>{girl.three_size}</Text>
                    </Stack>
                  </Box>
                </Flex>
              </>
            )}

            {!isSelected ? null : (
              <>
                <Box m={8} />
                <Title title="投稿内容" />
                <FormControl>
                  <FormLabel>お名前</FormLabel>
                  <Input maxLength={20} placeholder="20文字以内" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </FormControl>
                <Box m={2} />
                <FormControl>
                  <FormLabel>訪問日</FormLabel>
                  <Input type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
                </FormControl>
                <Box m={2} />
                <FormControl>
                  <FormLabel>顔</FormLabel>
                  <Slider {...sliderOptions} onChange={(val) => setFace(val)}>
                    {marks()}
                    <SliderMark value={face} textAlign="center" bg="teal" rounded="base" color="white" mt="-10" ml="-5" w="12">
                      {face}点
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <Box m={6} />
                <FormControl>
                  <FormLabel>身体</FormLabel>
                  <Slider {...sliderOptions} onChange={(val) => setBody(val)}>
                    {marks()}
                    <SliderMark value={body} textAlign="center" bg="teal" rounded="base" color="white" mt="-10" ml="-5" w="12">
                      {body}点
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <Box m={6} />
                <FormControl>
                  <FormLabel>愛嬌</FormLabel>
                  <Slider {...sliderOptions} onChange={(val) => setCharm(val)}>
                    {marks()}
                    <SliderMark value={charm} textAlign="center" bg="teal" rounded="base" color="white" mt="-10" ml="-5" w="12">
                      {charm}点
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <Box m={6} />
                <FormControl>
                  <FormLabel>サービス</FormLabel>
                  <Slider {...sliderOptions} onChange={(val) => setService(val)}>
                    {marks()}
                    <SliderMark value={service} textAlign="center" bg="teal" rounded="base" color="white" mt="-10" ml="-5" w="12">
                      {service}点
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <Box m={6} />
                <FormControl>
                  <FormLabel>エロさ</FormLabel>
                  <Slider {...sliderOptions} onChange={(val) => setErotic(val)}>
                    {marks()}
                    <SliderMark value={erotic} textAlign="center" bg="teal" rounded="base" color="white" mt="-10" ml="-5" w="12">
                      {erotic}点
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <Box m={6} />
                <FormControl>
                  <FormLabel>テクニック</FormLabel>
                  <Slider {...sliderOptions} onChange={(val) => setTechnique(val)}>
                    {marks()}
                    <SliderMark value={technique} textAlign="center" bg="teal" rounded="base" color="white" mt="-10" ml="-5" w="12">
                      {technique}点
                    </SliderMark>
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </FormControl>
                <Box m={6} />
                <FormControl>
                  <FormLabel>総合評価</FormLabel>
                  <Flex>
                    {stars(score)}
                    <Box m="auto">
                      <Heading flex={2}>{score}</Heading>
                    </Box>
                  </Flex>
                </FormControl>
                <Box m={2} />
                <FormControl>
                  <FormLabel>タイトル</FormLabel>
                  <Input maxLength={20} placeholder="20文字以内" value={title} onChange={(e) => setTitle(e.target.value)} />
                </FormControl>
                <Box m={2} />
                <FormControl>
                  <FormLabel>詳細</FormLabel>
                  <Textarea maxLength={400} placeholder="女の子の感想等をご自由に入力してください。（400文字以内）" h="10em" value={contents} onChange={(e) => setContents(e.target.value)} />
                </FormControl>
              </>
            )}
          </ModalBody>
          <Divider />

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={submit}>
              投稿
            </Button>
            <Button
              onClick={() => {
                props.onClose();
                initializeForm();
                setId('');
                setIsSelected(false);
              }}
            >
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Form;
