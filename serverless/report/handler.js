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
        let resultCsv = "initial,table,cols\r";
        result.Items.forEach((element) => {
            // for each field, append content + ','
            // object.keys?
            resultCsv += element.uuid + ",";
            resultCsv += element.coloradoArrest + ",";
            resultCsv += element.outcome + ",";
            // at the end of each field appending, append \r
            resultCsv += "\r";
        });
        console.log("this is the csv before write");
        console.log(resultCsv);
        // fs.writeFile resultCsv to file
        fs.writeFile("./resultCsv.csv", resultCsv, (err) => {
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