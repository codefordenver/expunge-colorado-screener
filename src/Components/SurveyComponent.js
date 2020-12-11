import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from '../data/survey.js';
import { useState, useEffect, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const myCss = {
    matrix: {
        root: 'table table-striped',
    },
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function SurveyComponent() {
    const [surveyData, setSurveyData] = useLocalStorage('surveyData', null);

    function sendDataToServer(survey) {
        console.log(survey);
    }

    function persistDataToLocalStorage(survey) {
        setSurveyData(survey.data);
    }

    useEffect(() => {});

    return (
        <Survey.Survey
            json={SURVEY_DATA}
            css={myCss}
            onValueChanged={persistDataToLocalStorage}
            onComplete={sendDataToServer}
        />
    );
}

export default SurveyComponent;
