import React, { useState } from 'react';
import jsSHA from 'jssha';
import * as Survey from 'survey-react';
import SCREENER_SURVEY_MODEL from './data/screenerModel.js';
import ScreenerSurvey from './Components/ScreenerSurvey';
import logo from './assets/logo.jpg';
import './App.scss';
import IntroScreen from './Components/IntroScreen.js';

const surveyModel = new Survey.Model(SCREENER_SURVEY_MODEL);
surveyModel.showPreviewBeforeComplete = 'showAnsweredQuestions';

// * uncomment next line for console debugging
// window.survey = surveyModel;

const shaObj = new jsSHA('SHA-1', 'TEXT');
// this creates a hash from the stringified survey model so we can version it (know if it changed)
shaObj.update(JSON.stringify(SCREENER_SURVEY_MODEL));
const hash = shaObj.getHash('HEX');

export default () => {
    const [screenerStarted, setScreenerStarted] = useState(false);

    return (
        <React.StrictMode>
            <div className="app">
                <img src={logo} className="logo" />
                <h1 className="text-center">Record seal eligibility screener</h1>
                {screenerStarted ? (
                    <ScreenerSurvey
                        surveyModel={surveyModel}
                        version={hash}
                        setScreenerStarted={setScreenerStarted}
                    />
                ) : (
                    <IntroScreen setScreenerStarted={setScreenerStarted} />
                )}
            </div>
        </React.StrictMode>
    );
};
