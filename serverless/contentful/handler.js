'use strict';
const contentful = require('contentful');

const SPACE_ID = 'rlnzyzpg3lzx';
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
});

const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,GET',
};

const getOutcomes = async () => {
    try {
        const response = await client.getEntries();
        return {
            headers,
            statusCode: 200,
            body: JSON.stringify(response.items, null, 2),
        };
    } catch (ex) {
        return {
            headers,
            statusCode: 500,
            body: ex.message,
        };
    }
};

module.exports.contentful = async (event) => {
    switch (event.httpMethod) {
        case 'GET':
            return await getOutcomes();
        default:
            return {
                headers,
                statusCode: 404,
                body: JSON.stringify({
                    message: 'Invalid request method',
                }),
            };
    }
};
