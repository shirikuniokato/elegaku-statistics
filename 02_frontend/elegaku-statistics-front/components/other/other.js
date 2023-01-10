'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// Chakra UI関連
import { Flex, Box, Button, Text, Input, Textarea, FormControl, FormLabel } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

// その他
import Title from '../common/item-title';

const Other = () => {
  const [contents, setContents] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [twitterId, setTwitterId] = useState('');

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
      contents: contents,
      userName: userName,
      email: email,
      twitterId: twitterId,
    };

    const request = async () => {
      try {
        await axios.post('https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/other/contact/add', data);
      } catch (err) {
        console.log(err);
        toast({
          title: '送信に失敗しました。',
          status: 'error',
          ...toastConfig,
        });
        return;
      }

      toast({
        title: '送信に成功しました。',
        status: 'info',
        ...toastConfig,
      });

      // 入力内容をクリア
      setContents('');
      setUserName('');
      setEmail('');
      setTwitterId('');
    };
    request();
  };

  return (
    <>
      <Box p="16px">
        <Title title="お問い合わせ" />
        <FormControl>
          <FormLabel>お問い合わせ内容</FormLabel>
          <Textarea maxLength={400} placeholder="不具合や改善要望、ご感想等をご自由に入力してください。（400文字以内）" h="15em" value={contents} onChange={(e) => setContents(e.target.value)} />
        </FormControl>
        <Box mt={8} />
        <FormControl>
          <FormLabel>お名前</FormLabel>
          <Input maxLength={20} placeholder="20文字以内" value={userName} onChange={(e) => setUserName(e.target.value)} />
        </FormControl>
        <Box mt={4} />

        <FormControl>
          <FormLabel>メールアドレス</FormLabel>
          <Input type="email" placeholder="任意" maxLength={50} value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <Box mt={4} />

        <FormControl>
          <FormLabel>TwitterID</FormLabel>
          <Input placeholder="任意" maxLength={50} value={twitterId} onChange={(e) => setTwitterId(e.target.value)} />
        </FormControl>
        <Box mt={4} />

        <Text>ご入力いただいた、メールアドレスまたはTwiterID宛にご連絡いたします。</Text>

        <Box mt={12} />
        <Box>
          <Button w="100%" rounded="full" colorScheme="teal" size="lg" onClick={submit}>
            送信
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default Other;
