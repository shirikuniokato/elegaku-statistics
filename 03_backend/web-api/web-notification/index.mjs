import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler = async (event) => {
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
  };
  let body = {
    notificationList: {
      isError: false,
      errorMessage: '',
      count: 0,
      items: [],
    },
  };

  try {
    switch (event.routeKey) {
      case 'GET /notification/init/{userId}':
        body = await getNotificationList(event, body);
        break;
      case 'GET /notification/add/{girlId}/{userId}':
        body = await putNotification(event);
        break;
      case 'GET /notification/remove/{girlId}/{userId}':
        body = await deleteNotification(event);
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers,
  };
};

// GET /notification/init/{userId}
const getNotificationList = async (event, body) => {
  let result = [];
  const userId = event.pathParameters.userId;
  const girlList = await dynamo.scan({ TableName: 'girl' }).promise();
  const targetList = await dynamo.scan({ TableName: 'notification-target-user' }).promise();
  const isNotification = getIsNotification(userId, targetList.Items);

  girlList.Items.forEach((g) => {
    if (isNotification.includes(g.id)) {
      result.push({ ...g, isNotification: true });
    } else {
      result.push({ ...g, isNotification: false });
    }
  });

  body.notificationList.items = result;
  body.notificationList.count = result.length;
  body.notificationList.notificationCount = isNotification.length;
  return body;
};

const getIsNotification = (userId, targetList) => {
  const result = [];
  targetList.forEach((t) => {
    if (t.users.includes(userId)) result.push(t.id);
  });

  return result;
};

// GET /notification/add/{girlId}/{userId}
const putNotification = async (event) => {
  const girlId = event.pathParameters.girlId;
  const userId = event.pathParameters.userId;

  let target = await dynamo
    .get({
      TableName: 'notification-target-user',
      Key: {
        id: girlId,
      },
    })
    .promise();

  // ユーザを追加し、更新
  let item = {};
  if (Object.keys(target).length === 0) {
    item = {
      id: girlId,
      users: [userId],
    };
  } else {
    item = target.Item;
    item.users.push(userId);
  }

  await dynamo
    .put({
      TableName: 'notification-target-user',
      Item: item,
    })
    .promise();

  return {
    message: '登録に成功しました。',
  };
};

// GET /notification/remove/{girlId}/{userId}
const deleteNotification = async (event) => {
  const girlId = event.pathParameters.girlId;
  const userId = event.pathParameters.userId;
  let target = await dynamo
    .get({
      TableName: 'notification-target-user',
      Key: {
        id: girlId,
      },
    })
    .promise();

  target.Item.users = target.Item.users.filter((u) => u !== userId);

  // ユーザを削除し、更新
  await dynamo
    .put({
      TableName: 'notification-target-user',
      Item: target.Item,
    })
    .promise();

  return {
    message: '削除に成功しました。',
  };
};
