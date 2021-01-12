import React, { useState, useEffect } from 'react';
import * as Survey from 'survey-react';
import useLocalStorage from '../hooks/useLocalStorage';
import DemographicSurveyComponent from './DemographicSurveyComponent';
import DEMOGRAPHIC_SURVEY_DATA from '../data/demoSurvey';

const demoSurveyModel = new Survey.Model(DEMOGRAPHIC_SURVEY_DATA);

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function SurveyComponent({ surveyModel, version }) {
    const [cache, setCache] = useLocalStorage('surveyCache', null);
    const [outcome, setOutcome] = useState('');

    useEffect(() => {
        if (cache?.version === version) {
            surveyModel.data = cache.data;
            surveyModel.currentPageNo = cache.currentPageNo;
        } else {
            setCache({ version });
        }
    }, []);

    function handleComplete(survey) {
        setOutcome(survey.data.outcome);
        setCache(null);
    }

    function persistDataToLocalStorage({ currentPageNo, data }) {
        setCache({ ...cache, currentPageNo, data });
    }

    /* TODO/fix: if this is called *after* completing the survey,
       it resets everything except for question visibility on page 0
       (but corrects itself as soon as you try to select something) */
    function reset() {
        surveyModel.clear();
        setCache(null);
        setOutcome(null);
    }

    return (
        <div>
            {!outcome ? (
                <Survey.Survey
                    css={myCss}
                    model={surveyModel}
                    onValueChanged={persistDataToLocalStorage}
                    onComplete={handleComplete}
                />
            ) : (
                <Outcome type={outcome} />
            )}
            <button onClick={reset} className="btn-nav">
                Reset
            </button>
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
                    <DemographicSurveyComponent surveyModel={demoSurveyModel} />
                </div>
            );
        case 'needInfo':
            return (
                <div>
                    <h2>Need more info</h2>
                    <div>go here ask this ....</div>
                    <DemographicSurveyComponent surveyModel={demoSurveyModel} />
                </div>
            );
        case 'ineligible':
            return (
                <div>
                    <h2>Sorry not eligible</h2>
                    <div>here are resources</div>
                    <DemographicSurveyComponent surveyModel={demoSurveyModel} />
                </div>
            );
        default:
            return null;
    }
};

export default SurveyComponent;
