import React, { useState, useEffect } from 'react';
import jsSHA from 'jssha';
import * as Survey from 'survey-react';
import SCREENER_SURVEY_MODEL from './data/screenerModel.js';
import ScreenerSurvey from './Components/ScreenerSurvey';
import logo from './assets/logo.png';
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
import { getContent } from './api/apiContentService';

export default () => {
    const [screenerStarted, setScreenerStarted] = useState(false);
    const [outcomeContent, setOutcomeContent] = useState(null);
    const [introContent, setIntroContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(async () => {
        setLoading(true);
        try {
            const res = await getContent();
            const introEntry = res.data.find((item) => item.fields.id === 'intro').fields;
            setIntroContent(introEntry);
            const outcomeEntries = res.data
                .filter((item) => item.sys.contentType.sys.id === 'screenerOutcome')
                .map((item) => item.fields);
            setOutcomeContent(outcomeEntries);
        } catch (e) {
            console.log(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

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
                        outcomeContent={outcomeContent}
                    />
                ) : (
                    <>
                        {loading && 'Loading more info...'}
                        {introContent && (
                            <>
                                <IntroScreen
                                    setScreenerStarted={setScreenerStarted}
                                    introContent={introContent}
                                />
                            </>
                        )}
                        {error && (
                            <>
                                <h4>
                                    Unable to load additional information. Please contact
                                    us at{' '}
                                    <a href="https://expungecolorado.org">
                                        expungecolorado.org
                                    </a>
                                </h4>
                            </>
                        )}
                    </>
                )}
            </div>
        </React.StrictMode>
    );
};
