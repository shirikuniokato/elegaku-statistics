'use client';

import { useState, useEffect } from 'react';
// Chakra UI関連
import { Box, Button, Input, Text, Link } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
// その他
import Title from '../common/item-title';
import NotificationList from './notification-list';

import axios from 'axios';

// Firebase関連
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAJndhsQ7p1R37Er4I3mJVor7jHApsiEP8',
  authDomain: 'elegaku-unofficial.firebaseapp.com',
  projectId: 'elegaku-unofficial',
  storageBucket: 'elegaku-unofficial.appspot.com',
  messagingSenderId: '587503892825',
  appId: '1:587503892825:web:81eee98cf6b8f6f5b9b448',
  measurementId: 'G-ZD497SBJ1R',
};
const app = initializeApp(firebaseConfig);
const provider = new TwitterAuthProvider();
provider.setCustomParameters({ lang: 'ja' });
const auth = getAuth(app);
auth.languageCode = 'ja';

// TODO 第二引数をuserに戻す
const Notification = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [isError, setIsError] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/notification/init/${userId}`);
        setNotificationList(response.data.notificationList);
      } catch (err) {
        setIsError(true);
      }
    };
    request();
  }, [userId]);

  const login = () => {
    setIsError(false);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUserId(user.providerData[0].uid);
        setUserName(user.reloadUserInfo.screenName);
      })
      .catch((error) => {
        setIsError(true);
      });
  };

  return (
    <>
      <Box p="16px">
        <Title title="Twitterログイン" />
        <Box>
          <Input flex={4} value={userName} mb={4} bgColor="gray.200" placeholder="@ユーザID" disabled />
          <Button flex={2} maxW="150px" colorScheme="twitter" leftIcon={<FaTwitter />} onClick={() => login()} isDisabled={userId !== ''}>
            ログイン
          </Button>
          <Text mt={2} fontSize="sm">
            iOSの方は一度、
            <Link flex={2} color="teal.500" href="https://twitter.com/login" target="_brank">
              こちら
            </Link>
            からブラウザにてTwitterログイン後、上記のログインボタンをクリックしてください。
          </Text>

          {isError ? (
            <Text mt={2} color="red.500" fontSize="sm">
              ログインに失敗しました。
            </Text>
          ) : null}
        </Box>

        <Box mb={8} />
        <Title title="生徒一覧" />
        {userId === '' ? <Text>ログインしてください。</Text> : <NotificationList userId={userId} notificationList={notificationList} />}
        <Box mb={8} />
      </Box>
    </>
  );
};
export default Notification;
