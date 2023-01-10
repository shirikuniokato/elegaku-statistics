'use client';

import { Box } from '@chakra-ui/react';

import NotificationItem from './notification-item';

const NotificationList = (props) => {
  const list = [];

  for (const item of props.notificationList.items.sort((a, b) => (a.id > b.id ? 1 : -1))) {
    list.push(<NotificationItem item={item} userId={props.userId} />);
  }

  return (
    <>
      <Box>{list}</Box>
    </>
  );
};

export default NotificationList;
