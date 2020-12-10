import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from '../data/survey.js';
import { useState, useEffect, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

function SurveyComponent() {

    const [surveyData, setSurveyData] = useLocalStorage(Object.keys, Object.values)

    function sendDataToServer(survey) {
        console.log(survey)
    }

    function persistDataToLocalStorage(survey)  {
        setSurveyData(survey.data)
    }

    useEffect(() => {});

    return <Survey.Survey json={SURVEY_DATA}   onValueChanged={persistDataToLocalStorage} onComplete={sendDataToServer} />;
}

export default SurveyComponent;
