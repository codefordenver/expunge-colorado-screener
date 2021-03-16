'use strict';
const contentful = require('contentful');

const SPACE_ID = 'rlnzyzpg3lzx';
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
});

const getOutcomes = async () => {
    try {
        const response = await client.getEntries();
        return {
            statusCode: 200,
            body: JSON.stringify(response.items, null, 2),
        };
    } catch (e) {
        // TODO: return
    }
};

const mapAssetsToEntries = (entries, assets) => {
    // TODO?
};

module.exports.contentful = async (event) => {
    return await getOutcomes();
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
