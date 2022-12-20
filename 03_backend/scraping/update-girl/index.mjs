import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require('axios');
const cheerio = require('cheerio');
const aws = require('aws-sdk');
aws.config.update({ region: "ap-northeast-1" });
const dynamo = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

export const handler = async(event) => {
    // 在籍情報取得
    let girls = await getGirl();

    // 在籍情報更新
    let prm= {
        TableName : 'girl',
        Item : null
    };

    for(const g of girls){
        prm.Item = g;
        await dynamo.put(prm, function(err, data) {
            // if (err.errorType === 'Error') return { statusCode: 400, body: err}
          }).promise();
    }
    return { statusCode: 200, body: '成功' };
};

const getGirl = async () => {
    try {
		const { data } = await axios.get(
			'https://www.elegaku.com/cast/'
		);
		const $ = cheerio.load(data);
		const result = [];
        $('#mixitup > #companion_box').each((_idx, el) => {
            result.push({
                id        :$(el).find('.g_image > a').attr('href').replace(/\//g, '').replace('profiletopcastCode', ''),
                name      :$(el).find('.g_image > a > img').attr('alt'),
                age       :$(el).find('.name > a > .age').text(),
                three_size:$(el).find('.size').text(),
                catch_copy:$(el).find('.catch').text(),
                image     :'https:' + $(el).find('.g_image > a > img').attr('src')
            });
        });
		return result;
	} catch (error) {
		throw error;
	}
};