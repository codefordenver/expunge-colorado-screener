import React from 'react';
import jsSHA from 'jssha';
import * as Survey from 'survey-react';
import SCREENER_SURVEY_MODEL from './data/screenerModel.js';
import ScreenerSurvey from './Components/ScreenerSurvey';
import logo from './assets/logo.jpg';
import './App.scss';

const surveyModel = new Survey.Model(SCREENER_SURVEY_MODEL);

// * uncomment next line for console debugging
// window.survey = surveyModel;

const shaObj = new jsSHA('SHA-1', 'TEXT');
// this creates a hash from the stringified survey model so we can version it (know if it changed)
shaObj.update(JSON.stringify(SCREENER_SURVEY_MODEL));
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
