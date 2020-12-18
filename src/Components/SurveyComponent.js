import React from 'react';
import * as Survey from 'survey-react';
import { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const myCss = {
    matrix: {
        root: 'table table-striped',
    },
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function SurveyComponent({ surveyModel }) {
    const [cache, setCache] = useLocalStorage('surveyCache', null);
    const [outcome, setOutcome] = useState('');

    useEffect(() => {
        surveyModel.data = cache?.data;
        surveyModel.currentPageNo = cache?.currentPageNo;
    }, []);

    function handleComplete(survey) {
        setOutcome(survey.data.outcome);
        setCache(null);
    }

    function persistDataToLocalStorage({ currentPageNo, data }) {
        setCache({ currentPageNo, data });
    }

    // TODO/fix: if called *after* completing the survey,
    // all questions on first page are visible (this gets
    // corrected as soon as you select anything)
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
