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
      case 'GET /items/{id}/{date}':
        body = await dynamo
          .get({
            TableName: 'attendance-information',
            Key: {
              id: event.pathParameters.id,
              date: event.pathParameters.date,
            },
          })
          .promise();
        break;
      case 'GET /items':
        body = await dynamo
          .scan({ TableName: 'attendance-information' })
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
