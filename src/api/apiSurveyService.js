//Calls to API gateway rest API , integrated with DynamoDB to store data.
import axios from 'axios';

const DEV_URL = 'https://7h8jqdiilc.execute-api.us-west-2.amazonaws.com/dev'; //obviously change this later

async function putSurveyResult(surveyResponse) {
    let result = await axios.put(`${DEV_URL}/result`, surveyResponse);
    console.log(result);
    return result;
}

//TODO: Add authorization requirement to this in API Gateway
async function getSurveyResult(uuid) {
    let result = await axios.get(`${DEV_URL}/result?uuid=${uuid}`);
    console.log(result);
    return result;
}

export { putSurveyResult, getSurveyResult };
