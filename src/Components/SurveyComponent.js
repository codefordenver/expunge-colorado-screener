import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from '../data/survey.js';
import { useState, useEffect, useRef } from 'react';

function SurveyComponent() {
    function sendDataToServer(survey) {
        console.log(survey.data);
        console.log(Survey.Survey)
    }

    function valueChanged()  {
        console.log('page change')
    }

    useEffect(() => {});

    return <Survey.Survey json={SURVEY_DATA}   onValueChanged={valueChanged} onComplete={sendDataToServer} />;
}

export default SurveyComponent;
