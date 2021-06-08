'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    try {
        //performing scan
        let params = {
            TableName: 'expunge-survey-results',
            Limit: 1000
        };
        let result = await docClient.scan(params).promise();
        console.log('Query Success');
        let reportCsv = "initial,table,cols\n";
        result.Items.forEach((element) => {
            // for each field, append content + ','
            // object.keys?
            reportCsv += element.uuid + ",";
            reportCsv += element.coloradoArrest + ",";
            reportCsv += element.outcome + ",";
            // at the end of each field appending, append \n
            reportCsv += "\n";
        });
        console.log("this is the csv before write");
        console.log(reportCsv);
        let bucket = "cfdreportbucket";
        let todayDate = new Date();
        let timestamp = todayDate.getFullYear() + ("0" + (todayDate.getMonth() + 1)).slice(-2) + ("0" + todayDate.getDate()).slice(-2) + ("0" + todayDate.getHours() + 1 ).slice(-2) + ("0" + todayDate.getMinutes()).slice(-2) + ("0" + todayDate.getSeconds()).slice(-2);
        let key = `report${timestamp}.csv`;
        let s3Params = {
            Bucket : bucket,
            Key : key,
            Body : reportCsv,
            ContentType: 'text/csv'
        }
        try {
            let s3Response = await s3.upload(s3Params).promise();
            console.log('put success', s3Response.Location);
        } catch (e){
            console.error('s3 put failure. Error', e);
        }
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