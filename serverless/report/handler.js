'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

// const headers = {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
//     'Access-Control-Allow-Headers': 'Content-Type',
// };

module.exports.report = async (event) => {
    try {
        //performing scan
        let params = {
            TableName: 'expunge-survey-results',
            Limit: 1000
        };
        let result = await docClient.scan(params).promise();
        console.log('Query Success');
        result.Items.forEach((element) => {
            console.log(element);
        });
        return {
            // headers,
            // statusCode: 200,
            // body: JSON.stringify({
            //     items: result.Items,
            //     lastItem: result.LastEvaluatedKey,
            // }),
        };
    } catch (ex) {
        console.error('Scan failure. Error:', ex);
        return {
            // headers,
            // statusCode: 500,
            // body: ex.message,
        };
    }
};
