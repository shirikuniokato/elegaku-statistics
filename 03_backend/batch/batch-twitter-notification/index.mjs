import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });
const { TwitterApi } = require('twitter-api-v2');
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_TOKEN,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

export const handler = async (event) => {
  const target = await dynamo.scan({ TableName: 'notification' }).promise();
  const targetUser = await dynamo.scan({ TableName: 'notification-target-user' }).promise();

  // 対象データがない場合は終了
  if (target.Count === 0 || targetUser.Count === 0) return { statusCode: 200, body: '対象データなし' };

  // 通知済み または 開始、終了時間が空文字のデータを除外
  const targetItems = target.Items.filter((t) => !t.isNotification && t.start !== '' && t.end !== '');

  // 更新対象の出勤情報を抽出
  // また、通知フラグはtrueにする
  const notification = filterNotificationList(targetItems, targetUser.Items);

  // TwitterのDirectMessageで通知
  await sendDirectMessage(notification.notificationItems);

  // 通知済みに更新
  let prm = {
    TableName: 'notification',
    Item: null,
  };
  for (const item of notification.updateItems) {
    prm.Item = item;
    await dynamo.put(prm).promise();
  }
  return { statusCode: 200, body: '成功' };
};

// 通知対象を絞り込む
const filterNotificationList = (target, targetUser) => {
  const result = {
    updateItems: [],
    notificationItems: [],
  };

  for (const u of targetUser) {
    if (u.users.length === 0) continue;

    const matchItem = target.filter((t) => t.id === u.id);
    if (matchItem.length === 0) continue;

    for (const n of matchItem) {
      result.updateItems.push({ ...n, isNotification: true });
      result.notificationItems.push({ ...n, users: u.users });
    }
  }
  return result;
};

// Send a direct message to a user
const sendDirectMessage = async (notificationList) => {
  for (const n of notificationList) {
    const message = `出勤情報が更新されました。\r\n生徒名：${n.name}さん\r\n日時　：${n.date} ${n.start}～${n.end}`;
    for (const u of n.users) {
      try {
        await send(u, message);
      } catch (err) {
        console.log(err);
      } finally {
        continue;
      }
    }
  }
};

const send = async (user, message) => {
  await twitterClient.v1.sendDm({
    recipient_id: user,
    text: message,
  });
};
