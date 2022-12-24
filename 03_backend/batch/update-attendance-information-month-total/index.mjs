import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler = async (event) => {
  let body;
  let statusCode = 200;
  const headers = { 'Content-Type': 'application/json' };

  try {
    const date = new Date();

    // 実行月の出勤情報を取得する
    const params = {
      TableName: 'attendance-information-month',
      FilterExpression: 'ym = :ym',
      ExpressionAttributeValues: { ':ym': `${date.getFullYear()}-${date.getMonth() + 1}` },
    };
    body = await dynamo.scan(params).promise();

    // データの存在チェック
    if (body.Items.length === 0) throw new Error(`データの取得に失敗しました`);

    // データを集計する
    let registData = createData(body.Items);

    // 集計データを登録・更新する
    let prm = {
      TableName: 'attendance-information-month-total',
      Item: registData,
    };
    await dynamo
      .put(prm, function (err, data) {
        if (err) throw new Error(`データの登録に失敗しました`);
      })
      .promise();

    body = { message: '集計が完了しました', data: registData };
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return { statusCode, body, headers };
};

const createData = (items) => {
  let result = {
    ym: items[0].ym,
    attendanceDays: 0,
    attendanceTime: 0,
  };

  items.forEach((item) => {
    if (item.attendanceDays === 0 || item.attendanceTime === 0) return;

    result.attendanceDays += item.attendanceDays;
    result.attendanceTime += item.attendanceTime;
  });

  return result;
};
