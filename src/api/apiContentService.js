import axios from 'axios';

const DEV_URL = 'https://7h8jqdiilc.execute-api.us-west-2.amazonaws.com/dev'; //obviously change this later

async function getContent() {
    const content = await axios.get(`${DEV_URL}/content`);
    console.log(content);
    return content;
}

export { getContent };
