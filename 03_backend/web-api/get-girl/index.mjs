import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const aws = require('aws-sdk');
aws.config.update({ region: "ap-northeast-1" });
const dynamo = new aws.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});


export const handler = async(event) => {
    let prm= {
        TableName : 'girl',
        Item : null
    };
    return { statusCode: 200, body: '成功' };
};