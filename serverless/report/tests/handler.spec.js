const assert = require('assert');
const { expunge } = require('../handler');
const AWS = require('aws-sdk');
const TEST_SURVEY = require('./test_survey');
AWS.config.update({ region: 'us-west-2' });

describe('Expunge', function () {
    //Add a before all to populate test data
    let test_uuid = null;

    this.timeout(360000);

    it('PUT should return a uuid for the newly created item', async function () {
        let result = await expunge({
            httpMethod: 'PUT',
            body: JSON.stringify(TEST_SURVEY),
        });
        test_uuid = result.body;
        console.log(JSON.stringify(result));
        assert(result.body != null);
    });

    it('GET should return Expunge survey result', async function () {
        let result = await expunge({
            httpMethod: 'GET',
            queryStringParameters: { uuid: test_uuid, type: 'test' },
        });
        console.log(result);

        let json = JSON.parse(result.body);
        assert(json.result.Item != null);
    });

    it('DELETE should return just a status code', async function () {
        //Use previously created uuid
        let result = await expunge({
            httpMethod: 'DELETE',
            queryStringParameters: {
                uuid: test_uuid,
                type: 'test',
            },
        });
        assert(result.statusCode == 200);
    });
});
