import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from '../data/survey.js';
import { useState, useEffect, useRef } from 'react';
import useLocalStorage from '../hooks/useLocalStorage'

function SurveyComponent() {

    function sendDataToServer(survey) {
        console.log(survey)
    }

    function valueChanged(survey)  {
        console.log(Object.keys(survey.data))
    }

    useEffect(() => {});

    return <Survey.Survey json={SURVEY_DATA}   onValueChanged={valueChanged} onComplete={sendDataToServer} />;
}

export default SurveyComponent;
