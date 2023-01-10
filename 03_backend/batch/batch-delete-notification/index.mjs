import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler = async (event) => {
  // システム日付の前日を取得
  const jstOffset = 9 * 60;
  const yesterday = new Date();
  const offset = yesterday.getTimezoneOffset() + jstOffset;
  yesterday.setTime(yesterday.getTime() + offset * 60 * 1000);
  // 前日を特定
  yesterday.setDate(yesterday.getDate() - 1);
  // yyyy-mm-dd形式に変換
  const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;

  // 削除処理
  try {
    const targetData = await dynamo
      .query({
        TableName: 'notification',
        KeyConditionExpression: '#d = :yesterday',
        ExpressionAttributeNames: { '#d': 'date' },
        ExpressionAttributeValues: {
          ':yesterday': yesterdayStr,
        },
      })
      .promise();

    if (targetData.Count === 0) return;

    for (const t of targetData.Items) {
      await dynamo
        .delete({
          TableName: 'notification',
          Key: { date: t.date, id: t.id },
        })
        .promise();
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: '失敗' };
  } finally {
    return { statusCode: 200, body: '成功' };
  }
};
