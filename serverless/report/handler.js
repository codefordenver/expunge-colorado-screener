'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const fs = require('fs');

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
        // fs.writeFile reportCsv to file
        fs.writeFile("./reportCsv.csv", reportCsv, (err) => {
            if (err) {
                console.log('this is the filewrite error');
                console.log(err)
            };
            console.log("this is the successful data response from fs");
        })
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