import ReactDOM from 'react-dom';
import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from './data/survey.js';
import SurveyComponent from './Components/SurveyComponent';
import './App.scss';

const surveyModel = new Survey.Model(SURVEY_DATA);
// for debugging
// window.survey = surveyModel;

ReactDOM.render(
    <React.StrictMode>
        <div className="app">
            <h1>Expunge Colorado Screener</h1>
            <div className="center-me">
                <SurveyComponent surveyModel={surveyModel} />
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
