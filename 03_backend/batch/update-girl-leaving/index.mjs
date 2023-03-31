import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');
const cheerio = require('cheerio');
const aws = require('aws-sdk');
aws.config.update({ region: 'ap-northeast-1' });
const dynamo = new aws.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

export const handler = async (event) => {
  // DynamoDBに登録済の女の子を取得
  const dbGirls = await dynamo.scan({ TableName: 'girl' }).promise();

  // 在籍情報取得
  let girls = await getGirl();

  // 退店済の女の子か判定
  let updateCount = 0;
  for(let g of dbGirls.Items){
    // すでに退店済で登録されているレコードは無視
    if(g.isLeaving) continue;

    const enrolledGirl = girls.filter((sg) => sg.id == g.id);
    // DB登録済 and HPに載っていない場合は退店済とする
    if(enrolledGirl.length !== 0) continue;

    updateCount++;

    // 退店済に更新
    g.isLeaving = true;
    let prm = {
      TableName: 'girl',
      Item: g,
    };
    await dynamo.put(prm, function (err, data) {}).promise();
  }
  console.log(updateCount);
  return { statusCode: 200, body: '成功' };
};

const getGirl = async () => {
  try {
    const { data } = await axios.get('https://www.elegaku.com/cast/');
    const $ = cheerio.load(data);
    const result = [];
    $('#mixitup > #companion_box').each((_idx, el) => {
      result.push({
        id: $(el).find('.g_image > a').attr('href').replace(/\//g, '').replace('profiletopcastCode', ''),
        name: $(el).find('.g_image > a > img').attr('alt'),
        age: $(el).find('.name > a > .age').text(),
        three_size: $(el).find('.size').text(),
        catch_copy: $(el).find('.catch').text(),
        image: 'https:' + $(el).find('.g_image > a > img').attr('src'),
        isLeaving: false,
      });
    });
    return result;
  } catch (error) {
    throw error;
  }
};
