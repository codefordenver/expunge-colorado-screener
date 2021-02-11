import * as Survey from 'survey-react';

import React, { useEffect, useState } from 'react';

import ScreenerOutcome from './ScreenerOutcome';
import useLocalStorage from '../hooks/useLocalStorage';
import { getSurveyResult, putSurveyResult } from '../api/apiSurveyService';

import { v4 as uuidv4 } from 'uuid';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function ScreenerSurvey({ surveyData, version }) {
    const [surveyModel, setSurveyModel] = useState(new Survey.Model(surveyData));
    const [cache, setCache] = useLocalStorage('screenerSurvey', null);
    const [outcome, setOutcome] = useState('');

    const [page, setPage] = useState(1);
    const percentProgress = (page / surveyModel.pageCount) * 100;

    useEffect(() => {
        if (cache?.version === version) {
            surveyModel.data = cache.data;
            surveyModel.currentPageNo = cache.currentPageNo;
            setSurveyModel(surveyModel);
            setPage(cache.currentPageNo + 1);
        } else {
            setCache({ version });
        }
    }, []);

    async function handleComplete(survey) {
        const uuid = uuidv4();

        const res = await putSurveyResult('expunge-screener', { ...survey.data, uuid });
        /* TODO/error: If success cache uuid, if not success cache failure, dispaly error toast? */
        setCache({ ...cache, uuid });
        setPage(surveyModel.pageCount);
        setOutcome(survey.data.outcome);
    }

    function handleValueChanged({ currentPageNo, data }) {
        setPage(currentPageNo + 1);
        setCache({ ...cache, currentPageNo, data });
    }

    /* TODO/fix: if this is called *after* completing the survey,
       it resets everything except for question visibility on page 0
       (but corrects itself as soon as you try to select something) */
    function reset() {
        setSurveyModel(new Survey.Model(surveyData));
        setCache(null);
        setOutcome(null);
        setPage(1);
    }

    return (
        <div className="main">
            {outcome ? (
                <ScreenerOutcome type={outcome} />
            ) : (
                <>
                    <ProgressBar percent={percentProgress} />
                    <Survey.Survey
                        css={myCss}
                        model={surveyModel}
                        onValueChanged={handleValueChanged}
                        onComplete={handleComplete}
                    />
                </>
            )}
            {/* <button onClick={reset} className="btn-nav">
                Reset
            </button> */}

            <div style={{ 'text-align': 'center' }}>
                <button onClick={reset} className="btn-nav">
                    Reset
                </button>
            </div>
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

export default ScreenerSurvey;
