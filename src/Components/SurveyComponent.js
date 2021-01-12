import React, { useState, useEffect } from 'react';
import * as Survey from 'survey-react';
import useLocalStorage from '../hooks/useLocalStorage';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function SurveyComponent({ surveyModel, version }) {
    const [cache, setCache] = useLocalStorage('surveyCache', null);
    const [page, setPage] = useState(1);
    const [outcome, setOutcome] = useState('');

    useEffect(() => {
        if (cache?.version === version) {
            surveyModel.data = cache.data;
            surveyModel.currentPageNo = cache.currentPageNo;
            setPage(cache.currentPageNo + 1);
        } else {
            setCache({ version });
        }
    }, []);

    function handleComplete(survey) {
        setPage(surveyModel.pageCount);
        setOutcome(survey.data.outcome);
        setCache(null);
    }

    function handleValueChanged({ currentPageNo, data }) {
        setPage(currentPageNo + 1);
        setCache({ ...cache, currentPageNo, data });
    }

    /* TODO/fix: if this is called *after* completing the survey,
       it resets everything except for question visibility on page 0
       (but corrects itself as soon as you try to select something) */
    function reset() {
        surveyModel.clear();
        setCache(null);
        setOutcome(null);
        setPage(1);
    }

    const percentProgress = (page / surveyModel.pageCount) * 100;

    return (
        <div className="main">
            {!outcome ? (
                <>
                    <ProgressBar percent={percentProgress} />
                    <Survey.Survey
                        css={myCss}
                        model={surveyModel}
                        onValueChanged={handleValueChanged}
                        onComplete={handleComplete}
                    />
                </>
            ) : (
                <Outcome type={outcome} />
            )}
            <button onClick={reset} className="btn-nav">
                Reset
            </button>
        </div>
    );
}

const ProgressBar = ({ percent }) => {
    return (
        <div className="progress-container">
            <div className="progress-value" style={{ width: `${percent}%` }}></div>
            <div className="progress-background"></div>
        </div>
    );
};

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
