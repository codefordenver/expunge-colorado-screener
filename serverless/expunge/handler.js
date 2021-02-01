'use strict';
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const { v4: uuidv4 } = require('uuid');

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers" : "Content-Type"
}

module.exports.expunge = async (event) => {
    switch(event.httpMethod) {
        case 'GET':
            return await getResult(event.queryStringParameters);
        case 'PUT':
            return await createUpdateResult(event.body,event.queryStringParameters); //aka the CrUP function
        case 'DELETE':
            return await deleteResult(event.pathParameters);
    }
};

async function deleteResult(pathParameters) {
    try{
        if(!pathParameters.uuid){
            return {
                headers,
                statusCode: 400,
                body: JSON.stringify({message: "No Survey result uuid provided for deletion"})                
            }
        }
        let params = {
            TableName: 'expunge-survey-results',
            Key: {
                uuid: pathParameters.uuid
            }
        }

        let result = await docClient.delete(params).promise();
        console.log("DELETE success");
        return {
            headers,
            statusCode: 200
        }
    } catch(ex){
        console.error("DELETE failure. Error:", ex)
        return {
            headers,
            statusCode: 500,
            body: ex.message
        }
    }
}

async function createUpdateResult(body,queryParams) {
    //strech out the dough
    try{    
        //Body is always a string with Lambda proxy integration
        body = JSON.parse(body);
        if(!body.uuid){
            //Generate a new survey ID
            body.uuid = uuidv4();
        }
        let params = {
            TableName: 'expunge-survey-results',
            Item: body,
        }
        let result = await docClient.put(params).promise();
        console.log("PUT Success");
        return {
            headers,
            statusCode: 200,
            body: body.uuid
        }

    } catch(ex){
        console.error("PUT failure. Error:", ex)
        return {
            headers,
            statusCode: 500,
            body: ex.message
        }
    }
}

async function getResult(queryParams) {
  try{
      //Instead of a Scan, just do a query for specific key
      let params = {
          TableName: 'expunge-survey-results',
          Key: {
            'uuid': queryParams.uuid
          }
      };      
      let result = await docClient.get(params).promise();
      console.log("Query Success");
      return {
          headers,
          statusCode: 200,
          body: JSON.stringify({
              result: result,
          })
      }                    
  } catch(ex){
      console.error("Query failure. Error:", ex)
      return {
          headers,
          statusCode: 500,
          body: ex.message
      }
  }
}

async function getResults(queryParams) {
    try{
        //Instead of a Scan, just do a query for specific key
        let params = {
            TableName: 'expunge-survey-results',
            Limit: queryParams && queryParams.limit ? queryParams.limit : 10 
        };
        if(queryParams && queryParams.lastItem){
            params.ExclusiveStartKey = { order: queryParams.lastItem }
        }
        let result = await docClient.scan(params).promise();
        console.log("Query Success");
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify({
                items: result.Items,
                lastItem: result.LastEvaluatedKey
            })
        }                    
    } catch(ex){
        console.error("Scan failure. Error:", ex)
        return {
            headers,
            statusCode: 500,
            body: ex.message
        }
    }
}