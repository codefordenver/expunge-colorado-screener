'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
    try {
        //performing scan
        let params = {
            TableName: 'expunge-survey-results',
            Limit: 10
        };
        let result = await docClient.scan(params).promise();
        console.log('Query Success');
        let reportCsv = "initial,table,cols\r";
        result.Items.forEach((element) => {
            // for each field, append content + ','
            // object.keys?
            reportCsv += element.uuid + ",";
            reportCsv += element.coloradoArrest + ",";
            reportCsv += element.outcome + ",";
            // at the end of each field appending, append \r
            reportCsv += "\r";
        });
        console.log("this is the csv before write");
        console.log(reportCsv);
        let bucket = "cfdreportbucket";
        let key = "report.csv";
        let body = JSON.stringify(reportCsv);
        let s3Params = {
            Bucket : bucket,
            Key : key,
            Body : data
        }
        s3.putObject(s3Params, function(err, data) {
          if (err) console.log(err, err.stack); // an error occurred
          else     console.log(data);           // successful response
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