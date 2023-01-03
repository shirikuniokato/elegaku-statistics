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
      count: 0,
      items: [],
    },
    girl: {
      count: 0,
      items: [],
    },
    isError: false,
    errorMessage: '',
  };

  try {
    switch (event.routeKey) {
      case 'GET /review/init':
        body = await init(body);
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
const init = async (body) => {
  try {
    const review = await dynamo.scan({ TableName: 'review' }).promise();
    const girl = await dynamo.scan({ TableName: 'girl' }).promise();

    // レビュー一覧の設定
    body.review.items = review.Items;
    body.review.count = review.Count;

    // girlの設定
    body.girl.items = girl.Items;
    body.girl.count = girl.Count;
  } catch (err) {
    body.isError = true;
    body.errorMessage = err.message;
  }

  return body;
};

// POST /review/add
const putNotification = async (event) => {
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
