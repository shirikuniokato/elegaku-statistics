'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

import { useToast } from '@chakra-ui/react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { IconButton } from '@chakra-ui/react';

const NotificationItem = (props) => {
  const [isAdd, setIsAdd] = useState(false);

  useEffect(() => {
    setIsAdd(props.item.isNotification);
  }, []);

  let image = 'https://cdn-fu-kakumei.com/image/f3503f821ae1bc0a/185/247/.api';
  if (props.item.image.indexOf('noimage') === -1) {
    image = props.item.image;
  }

  const toast = useToast();
  const toastConfig = {
    duration: 3000,
    isClosable: true,
    containerStyle: {
      marginBottom: 'calc(env(safe-area-inset-bottom) + 70px)',
    },
  };
  const clickAdd = () => {
    // 上限チェック
    // if (props.notificationCount >= 3) {
    //   toast({
    //     title: '通知登録は３人までです。',
    //     status: 'warning',
    //     ...toastConfig,
    //   });
    //   return;
    // }

    // 登録処理
    let isError = false;
    const request = async () => {
      try {
        await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/notification/add/${props.item.id}/${props.userId}`);
      } catch (err) {
        toast({
          title: '登録に失敗しました。',
          status: 'error',
          ...toastConfig,
        });
        isError = true;
      }
    };
    request();

    if (isError) return;

    toast({
      title: `${props.item.name}さんを通知登録しました。`,
      status: 'info',
      ...toastConfig,
    });

    // ボタンを解除ボタンに切り替える
    props.item.isNotification = true;
    setIsAdd(true);
  };

  const clickRemove = () => {
    // 解除処理
    let isError = false;
    const request = async () => {
      try {
        await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/notification/remove/${props.item.id}/${props.userId}`);
      } catch (err) {
        toast({
          title: '解除に失敗しました。',
          status: 'error',
          ...toastConfig,
        });
        isError = true;
      }
    };
    request();

    if (isError) return;
    toast({
      title: `${props.item.name}さんの通知登録を解除しました。`,
      status: 'info',
      ...toastConfig,
    });

    // ボタンを追加ボタンに切り替える
    props.item.isNotification = false;
    setIsAdd(false);
  };

  return (
    <>
      <Box mb="1vh">
        <Flex border="1px" borderColor="gray.200" borderRadius="md" shadow="md">
          <Image flex="1" borderTopLeftRadius="md" borderBottomLeftRadius="md" objectFit="cover" maxW="20%" mr="10px" src={image} alt={props.item.name} />
          <Box flex="3" mt="auto" mb="auto">
            <Box>
              <Text fontWeight="bold">{`${props.item.name}(${props.item.age})`}</Text>
              <Text fontSize="xs">{`${props.item.catch_copy}`}</Text>
              <Text fontSize="xs">{`${props.item.three_size}`}</Text>
            </Box>
          </Box>
          <Box flex="1" m="auto">
            {isAdd || props.item.isNotification ? <IconButton colorScheme="green" bgColor="#6dca91" size="md" rounded="full" icon={<AiOutlineCheck />} onClick={clickRemove} /> : <IconButton colorScheme="gray" size="md" rounded="full" icon={<AiOutlinePlus />} onClick={clickAdd} />}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default NotificationItem;
