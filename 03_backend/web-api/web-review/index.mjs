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
    review: {
      isError: false,
      errorMessage: '',
      count: 0,
      items: [],
    },
  };

  try {
    switch (event.routeKey) {
      case 'GET /review':
        body = await getReview(body);
        break;
      case 'POST /review/add':
        body = await putNotification(event);
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

// GET /review
const getReview = async (body) => {
  const result = await dynamo.scan({ TableName: 'review' }).promise();

  body.review.items = result.Items;
  body.review.count = result.Count;
  return body;
};

// POST /review/add
const putNotification = async (event) => {
  console.log(event);
  // postされたデータを取得
  const data = JSON.parse(event.body);
  // timestampをミリ秒で取得・設定
  const timestamp = new Date().getTime();
  data.timestamp = timestamp;

  await dynamo
    .put({
      TableName: 'review',
      Item: data,
    })
    .promise();

  return {
    message: '登録に成功しました。',
  };
};
