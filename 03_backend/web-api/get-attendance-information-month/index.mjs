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
      case 'GET /attendance-information-month':
        body = await dynamo.scan({ TableName: 'attendance-information-month' }).promise();
        // データの存在チェック
        if (body.Items.length === 0) throw new Error(`データの取得に失敗しました`);
        break;
      case 'GET /attendance-information-month/{ym}':
        // 月単位の出勤情報を取得する
        params = {
          TableName: 'attendance-information-month',
          FilterExpression: 'ym = :ym',
          ExpressionAttributeValues: { ':ym': event.pathParameters.ym },
        };
        body = await dynamo.scan(params).promise();
        // データの存在チェック
        if (body.Items.length === 0) throw new Error(`データの取得に失敗しました`);
        break;
      case 'GET /attendance-information-month/{ym}/{id}':
        // 月＋id単位の出勤情報を取得する
        params = {
          TableName: 'attendance-information-month',
          KeyConditionExpression: 'id = :id and ym = :ym',
          ExpressionAttributeValues: {
            ':id': event.pathParameters.id,
            ':ym': event.pathParameters.ym,
          },
        };
        body = await dynamo.query(params).promise();
        // データの存在チェック
        if (body.Items.length === 0) throw new Error(`データの取得に失敗しました`);
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
