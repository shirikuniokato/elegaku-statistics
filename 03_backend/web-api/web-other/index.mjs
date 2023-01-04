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
  let body = {};
  try {
    switch (event.routeKey) {
      case 'POST /other/contact/add':
        body = await putContact(event);
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

// POST /other/contact/add
const putContact = async (event) => {
  // postされたデータを取得
  const data = JSON.parse(event.body);
  // timestampをミリ秒で取得・設定
  const timestamp = new Date().getTime();
  data.timestamp = timestamp;

  await dynamo
    .put({
      TableName: 'contact',
      Item: data,
    })
    .promise();
  return {
    message: '登録に成功しました。',
  };
};
