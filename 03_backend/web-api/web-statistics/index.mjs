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
    attendanceInformation: {
      isError: false,
      errorMessage: '',
      count: 0,
      items: [],
    },
    attendanceInformationMonth: {
      isError: false,
      errorMessage: '',
      count: 0,
      items: [],
    },
    attendanceInformationMonthTotal: {
      currentMonth: {
        isError: false,
        errorMessage: '',
        exist: false,
        item: {},
      },
      lastMonth: {
        isError: false,
        errorMessage: '',
        exist: false,
        item: {},
      },
    },
  };

  console.log('start');
  try {
    switch (event.routeKey) {
      case 'GET /statistics/init/{ym}':
        body = await getAttendanceInformation(event, body);
        body = await getAttendanceInformationMonth(event, body);
        body = await getattendanceInformationMonthTotal(event, true, body);
        body = await getattendanceInformationMonthTotal(event, false, body);
        break;
      case 'GET /statistics/girl/init/{ym}/{id}':
        body = await getGirlAttendanceInformation(event, body);
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    console.log(err);
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

// 月の出勤情報取得
const getAttendanceInformation = async (event, body) => {
  try {
    // データ取得
    const result = await dynamo
      .scan({
        TableName: 'attendance-information',
        FilterExpression: 'begins_with(#d, :ym)',
        ExpressionAttributeNames: { '#d': 'date' },
        ExpressionAttributeValues: { ':ym': event.pathParameters.ym },
      })
      .promise();

    // 取得結果を設定
    body.attendanceInformation.items = result.Items;
    body.attendanceInformation.count = result.Count;
  } catch (err) {
    body.attendanceInformation.isError = true;
    body.attendanceInformation.errorMessage = err.message;
  } finally {
    return body;
  }
};

// 月単位の出勤情報を取得する
const getAttendanceInformationMonth = async (event, body) => {
  try {
    // データ取得
    const params = {
      TableName: 'attendance-information-month',
      FilterExpression: 'ym = :ym',
      ExpressionAttributeValues: { ':ym': event.pathParameters.ym },
    };
    const result = await dynamo.scan(params).promise();

    // 取得結果を設定
    body.attendanceInformationMonth.items = result.Items;
    body.attendanceInformationMonth.count = result.Count;
  } catch (err) {
    body.attendanceInformationMonth.isError = true;
    body.attendanceInformationMonth.errorMessage = err.message;
  } finally {
    return body;
  }
};

// 月単位の集計データを取得
const getattendanceInformationMonthTotal = async (event, isCurrent, body) => {
  try {
    // データ取得
    const targetYm = isCurrent ? event.pathParameters.ym : getBeforeMonth(event.pathParameters.ym);
    const params = {
      TableName: 'attendance-information-month-total',
      Key: { ym: targetYm },
    };
    const result = await dynamo.get(params).promise();

    // 取得結果を設定
    // オブジェクトの空チェック
    if (Object.keys(result).length !== 0) {
      if (isCurrent) {
        body.attendanceInformationMonthTotal.currentMonth.exist = true;
      } else {
        body.attendanceInformationMonthTotal.lastMonth.exist = true;
      }
      if (isCurrent) {
        body.attendanceInformationMonthTotal.currentMonth.item = result.Item;
      } else {
        body.attendanceInformationMonthTotal.lastMonth.item = result.Item;
      }
    }
  } catch (err) {
    if (isCurrent) {
      body.attendanceInformationMonthTotal.currentMonth.isError = true;
      body.attendanceInformationMonthTotal.currentMonth.errorMessage = err.message;
    } else {
      body.attendanceInformationMonthTotal.lastMonth.isError = true;
      body.attendanceInformationMonthTotal.lastMonth.errorMessage = err.message;
    }
  } finally {
    return body;
  }
};

// 前月取得
const getBeforeMonth = (ym) => {
  const date = new Date(ym.split('-')[0], ym.split('-')[1], 1);
  date.setMonth(date.getMonth() - 2);
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

// 月の出勤情報取得
const getGirlAttendanceInformation = async (event, body) => {
  try {
    // データ取得
    const result = await dynamo
      .scan({
        TableName: 'attendance-information',
        FilterExpression: 'begins_with(#d, :ym) and id = :id',
        ExpressionAttributeNames: { '#d': 'date' },
        ExpressionAttributeValues: { ':ym': event.pathParameters.ym, ':id': event.pathParameters.id },
      })
      .promise();

    // 取得結果を設定
    body.attendanceInformation.items = result.Items;
    body.attendanceInformation.count = result.Count;
  } catch (err) {
    body.attendanceInformation.isError = true;
    body.attendanceInformation.errorMessage = err.message;
  } finally {
    return body;
  }
};
