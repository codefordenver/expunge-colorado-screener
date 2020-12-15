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
    const [outcome, setOutcome] = useState('');

    function onComplete(survey) {
        setOutcome(survey.data.outcome);
    }

    function persistDataToLocalStorage(survey) {
        setSurveyData(survey.data);
    }

    return (
        <div>
            <Survey.Survey
                json={SURVEY_DATA}
                css={myCss}
                onValueChanged={persistDataToLocalStorage}
                onComplete={onComplete}
            />
            <Outcome type={outcome} />
        </div>
    );
}

const Outcome = ({ type }) => {
    switch (type) {
        case 'eligible':
            return (
                <div>
                    <h2>You are eligible!</h2>
                    <div>blah blah blah</div>
                </div>
            );
        case 'needInfo':
            return (
                <div>
                    <h2>Need more info</h2>
                    <div>go here ask this ....</div>
                </div>
            );
        case 'ineligible':
            return (
                <div>
                    <h2>Sorry not eligible</h2>
                    <div>here are resources</div>
                </div>
            );
        default:
            return null;
    }
};

export default SurveyComponent;
