import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from '../data/survey.js';
import { useState, useEffect, useRef } from 'react';

const myCss = {
    matrix: {
        root: 'table table-striped',
    },
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function SurveyComponent() {
    function sendDataToServer(survey) {
        console.log(survey.data);
    }

    return <Survey.Survey json={SURVEY_DATA} css={myCss} onComplete={sendDataToServer} />;
}

export default SurveyComponent;
