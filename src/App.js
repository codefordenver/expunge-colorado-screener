import React from 'react';
import jsSHA from 'jssha';
import * as Survey from 'survey-react';
import SURVEY_DATA from './data/survey.js';
import ScreenerSurvey from './Components/ScreenerSurvey';
import logo from './assets/logo.jpg';
import './App.scss';

const surveyModel = new Survey.Model(SURVEY_DATA);

// * uncomment next line for console debugging
// window.survey = surveyModel;

const shaObj = new jsSHA('SHA-1', 'TEXT');
// this creates a hash from the stringified survey json so we can version it (know if it changed)
shaObj.update(JSON.stringify(SURVEY_DATA));
const hash = shaObj.getHash('HEX');

export default () => {
    return (
        <React.StrictMode>
            <div className="app">
                <img src={logo} className="logo" />
                <h1>Record seal eligibility screener</h1>
                <ScreenerSurvey surveyModel={surveyModel} version={hash} />
            </div>
        </React.StrictMode>
    );
};
