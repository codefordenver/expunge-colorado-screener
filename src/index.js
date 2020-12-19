import ReactDOM from 'react-dom';
import React from 'react';
import jsSHA from 'jssha';
import * as Survey from 'survey-react';
import SURVEY_DATA from './data/survey.js';
import SurveyComponent from './Components/SurveyComponent';
import './App.scss';

const surveyModel = new Survey.Model(SURVEY_DATA);

// for debugging only
// window.survey = surveyModel;

// create survey version # by hashing stringified survey data
const shaObj = new jsSHA('SHA-1', 'TEXT');
shaObj.update(JSON.stringify(SURVEY_DATA));
const hash = shaObj.getHash('HEX');

ReactDOM.render(
    <React.StrictMode>
        <div className="app">
            <h1>Expunge Colorado Screener</h1>
            <div className="center-me">
                <SurveyComponent surveyModel={surveyModel} version={hash} />
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
