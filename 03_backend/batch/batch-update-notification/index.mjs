import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');
const cheerio = require('cheerio');
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler = async (event) => {
  // 現在登録済みの出勤情報
  const registeredAttendanceInformationList = await dynamo.scan({ TableName: 'notification' }).promise();

  // 出勤情報取得（スクレイピング）
  const attendanceInformationList = await getAttendanceInformation();

  // 更新対象の出勤情報を抽出
  const updateList = filterUpdateList(registeredAttendanceInformationList.Items, attendanceInformationList);

  // 出勤情報更新
  let prm = {
    TableName: 'notification',
    Item: null,
  };
  for (const item of updateList) {
    prm.Item = item;
    await dynamo.put(prm).promise();
  }
  return { statusCode: 200, body: '成功' };
};

const WEEK_PLUS = [0, 1, 2, 3, 4, 5, 6];
const getAttendanceInformation = async () => {
  try {
    const result = [];

    // 1週間分のデータを取得
    for (const n of WEEK_PLUS) {
      // URL特定
      let date = new Date();
      date.setHours(date.getHours() + 9);
      date.setDate(date.getDate() + n);
      const url = 'https://www.elegaku.com/cast/schedule/y/' + date.getFullYear() + '/MM/' + (date.getMonth() + 1) + '/dd/' + date.getDate();

      // データ取得
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      // データ整形
      $('#castBox > #companion_box').each((_idx, el) => {
        // 開始・終了時間
        const time = $(el).find('.time').text().trim();
        let start = '';
        let end = '';
        if (time !== '') {
          start = time.split('-')[0].trim();
          end = time.split('-')[1].trim();
        }

        result.push({
          id: $(el).find('.name > a').attr('href').replace(/\//g, '').replace('profiletopcastCode', ''),
          name: $(el)
            .find('.name > a')
            .text()
            .trim()
            .substring(0, $(el).find('.name > a').text().trim().length - 2),
          date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
          start: start,
          end: end,
        });
      });
    }
    return result;
  } catch (error) {
    throw error;
  }
};

const filterUpdateList = (registeredAttendanceInformationList, attendanceInformationList) => {
  const result = [];

  for (const a of attendanceInformationList) {
    const matchItem = registeredAttendanceInformationList.filter((r) => r.id === a.id && r.date === a.date);
    // 登録済みチェック
    if (matchItem.length === 0) {
      result.push({ ...a, isNotification: false });
    } else {
      // 登録済みの場合は、出勤時間が変更されているかチェック
      const target = matchItem[0];
      if (target.start !== a.start || target.end !== a.end) {
        result.push({ ...a, isNotification: false });
      }
    }
  }
  return result;
};
