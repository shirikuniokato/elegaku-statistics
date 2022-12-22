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
      TableName: 'attendance-information',
      FilterExpression: 'begins_with(#d, :ym)',
      ExpressionAttributeNames: { '#d': 'date' },
      ExpressionAttributeValues: { ':ym': `${date.getFullYear()}-${date.getMonth() + 1}` },
    };
    body = await dynamo.scan(params).promise();

    // データの存在チェック
    if (body.Items.length === 0) throw new Error(`データの取得に失敗しました`);

    // idごとに出勤日数、出勤時間を集計する
    const registData = calcAttendanceDaysAndTime(body.Items, `${date.getFullYear()}-${date.getMonth() + 1}`);

    // 集計データを登録・更新する
    let prm = {
      TableName: 'attendance-information-month',
      Item: null,
    };
    for (const data of registData) {
      prm.Item = data;
      await dynamo
        .put(prm, function (err, data) {
          // if (err.errorType != null || err.errorType === 'Error') return { statusCode: 400, body: err };
        })
        .promise();
    }

    body = { message: '出勤情報の集計が完了しました', data: registData };
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return { statusCode, body, headers };
};

// idごとに出勤日数、出勤時間を集計する
const calcAttendanceDaysAndTime = (data, ym) => {
  const result = [];

  const sortedData = data.sort((a, b) => (a.id > b.id ? 1 : -1));
  let info = { ym: ym, id: '', name: '', attendanceDays: 0, attendanceTime: 0 };
  let beforeId = '';
  let beforeName = '';
  let idCount = 0;
  for (const item of sortedData) {
    // ID判定
    if (item.id === beforeId) {
      // 前回レコードと同じIDの場合
      if (item.start !== '') {
        // 出勤日数の加算
        info.attendanceDays++;
        // 出勤時間の加算
        info.attendanceTime += calcTotalTime(item.start, item.end);
      }

      // 後処理
      beforeId = item.id;
      beforeName = item.name;
      continue;
    } else {
      // 前回レコードと異なるIDの場合
      // 一人目よりあとの場合、前回の人の情報をresultに追加
      if (idCount > 0) result.push(info);

      if (item.start !== '') {
        // 初期化
        info = { ym: ym, id: item.id, name: item.name, attendanceDays: 0, attendanceTime: 0 };
        // 出勤日数の加算
        info.attendanceDays++;
        // 出勤時間の加算
        info.attendanceTime += calcTotalTime(item.start, item.end);
      } else {
        // 初期化
        info = { ym: ym, id: item.id, name: item.name, attendanceDays: 0, attendanceTime: 0 };
      }

      // 後処理
      idCount++;
      beforeId = item.id;
      beforeName = item.name;
      continue;
    }
  }

  // 最後の一人がresultに追加されていない場合、追加
  if (result[result.length - 1].id !== beforeId) result.push(info);

  return result;
};

const calcTotalTime = (start, end) => {
  const endDate = end === '00:00' ? new Date('2020-10-15T' + end + ':00') : new Date('2020-10-14T' + end + ':00');
  const startDate = new Date('2020-10-14T' + start + ':00');

  return parseInt((endDate - startDate) / 1000 / 60 / 60);
};
