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
    switch (event.routeKey) {
      case 'GET /attendance-information':
        body = await dynamo.scan({ TableName: 'attendance-information' }).promise();
        break;
      case 'GET /attendance-information/{id}':
        body = await dynamo
          .query({
            TableName: 'attendance-information',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
              ':id': event.pathParameters.id,
            },
          })
          .promise();
        break;
      case 'GET /attendance-information/{id}/{ym}':
        body = await dynamo
          .query(
            {
              TableName: 'attendance-information',
              KeyConditionExpression: 'id = :id',
              ExpressionAttributeValues: {
                ':id': event.pathParameters.id,
              },
            },
            (err, data) => {
              if (err) {
                throw new Error('データ取得中にエラーが発生しました。');
              }
            }
          )
          .promise();

        body.Items = body.Items.filter((item) => item.date.startsWith(event.pathParameters.ym));
        body.Count = body.Items.length;
        break;
      case 'GET /attendance-information/ym/{ym}':
        body = await dynamo
          .scan({
            TableName: 'attendance-information',
            FilterExpression: 'begins_with(#d, :ym)',
            ExpressionAttributeNames: { '#d': 'date' },
            ExpressionAttributeValues: { ':ym': event.pathParameters.ym },
          })
          .promise();
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
