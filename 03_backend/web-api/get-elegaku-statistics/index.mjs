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
      // isError: 0,
      // errorMessage: '',
      count: 0,
      items: [],
    },
    attendanceInformationMonth: {
      // isError: 0,
      // errorMessage: '',
      count: 0,
      items: [],
    },
    attendanceInformationMonthTotal: {
      currentMonth: {
        // isError: 0,
        // errorMessage: '',
        exist: 1,
        item: {},
      },
      lastMonth: {
        // isError: 0,
        // errorMessage: '',
        exist: 1,
        item: {},
      },
    },
  };

  try {
    switch (event.routeKey) {
      case 'GET /elegaku-statistics/init/{ym}':
        body = await getAttendanceInformation(event, body);
        body = await getAttendanceInformationMonth(event, body);
        body = await getattendanceInformationMonthTotal(event, true, body);
        body = await getattendanceInformationMonthTotal(event, false, body);
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
    // body.attendanceInformation.isError = 1;
    // body.attendanceInformation.errorMessage = err.message;
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
    // body.attendanceInformationMonth.isError = 1;
    // body.attendanceInformationMonth.errorMessage = err.message;
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
    if (isEmpty(result)) {
      if (isCurrent) {
        body.attendanceInformationMonthTotal.currentMonth.exist = 0;
      } else {
        body.attendanceInformationMonthTotal.lastMonth.exist = 0;
      }
    } else {
      if (isCurrent) {
        body.attendanceInformationMonthTotal.currentMonth.item = result.Item;
      } else {
        body.attendanceInformationMonthTotal.lastMonth.item = result.Item;
      }
    }
  } catch (err) {
    if (isCurrent) {
      // body.attendanceInformationMonthTotal.currentMonth.isError = 1;
      // body.attendanceInformationMonthTotal.currentMonth.errorMessage = err.message;
    } else {
      // body.attendanceInformationMonthTotal.lastMonth.isError = 1;
      // body.attendanceInformationMonthTotal.lastMonth.errorMessage = err.message;
    }
  } finally {
    return body;
  }
};

// 前月取得
const getBeforeMonth = (ym) => {
  const date = new Date(ym.split('-')[0], ym.split('-')[1] - 1, 1);
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
};

// オブジェクト(={})の存在チェック
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
