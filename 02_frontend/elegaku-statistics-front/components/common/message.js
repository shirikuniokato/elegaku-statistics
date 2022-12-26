'use client';
import { useToast, Wrap, WrapItem } from '@chakra-ui/react';

const Message = (props) => {
  const toast = useToast();
  return (
    <>
      {props.isInit
        ? toast({
            title: 'お知らせ',
            description: '当サイトで使用しているデータは2022/12/20以降のデータとなります。\r\n2022/12/20より前のデータは確認できません。',
            status: 'info',
            isClosable: true,
          })
        : null}
    </>
  );
};

export default Message;
