import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    let params = {};
    switch (event.routeKey) {
      case 'GET /attendance-information-month-total':
        body = await dynamo.scan({ TableName: 'attendance-information-month-total' }).promise();
        // データの存在チェック
        if (body.Count === 0) throw new Error(`データの取得に失敗しました`);
        break;
      case 'GET /attendance-information-month-total/{ym}':
        // 月単位の集計データを取得
        params = {
          TableName: 'attendance-information-month-total',
          Key: {
            ym: event.pathParameters.ym,
          },
        };
        body = await dynamo.get(params).promise();
        // データの存在チェック
        if (!Object.keys(body).length) throw new Error(`データの取得に失敗しました`);
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
        [];
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
