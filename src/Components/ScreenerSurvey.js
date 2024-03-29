import * as Survey from 'survey-react';

import React, { useEffect, useState } from 'react';

import ScreenerOutcome from './ScreenerOutcome';
import useLocalStorage from '../hooks/useLocalStorage';
import { putSurveyResult } from '../api/apiSurveyService';

import { v4 as uuidv4 } from 'uuid';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
    panel: {
        footer: 'survey-footer',
    },
};

function ScreenerSurvey({ surveyModel, version, setScreenerStarted, outcomeContent }) {
    const [cache, setCache] = useLocalStorage('screenerSurvey', null);
    const [outcome, setOutcome] = useState('');
    const [loading, setLoading] = useState(true);
    const [filteredOutcomeContent, setFilteredOutcomeContent] = useState({});
    const [page, setPage] = useState(1);
    const percentProgress = (page / surveyModel.pageCount) * 100;

    useEffect(() => {
        surveyModel.onComplete.add(handleComplete);
        surveyModel.onValueChanged.add(handleValueChanged);
        if (cache?.version === version) {
            surveyModel.data = cache.data;
            surveyModel.currentPageNo = cache.currentPageNo;
            setPage(cache.currentPageNo + 1);
        } else {
            setCache({ version });
        }
    }, []);

    useEffect(() => {
        filteredOutcomeContent.id && setLoading(false);
    }, [filteredOutcomeContent]);

    async function handleComplete(survey) {
        setPage(surveyModel.pageCount);
        setOutcome(survey.data.outcome);
        const foundContentEntry = outcomeContent.find(
            (item) => item.id === survey.data.outcome
        );
        setFilteredOutcomeContent(foundContentEntry);
        const uuid = uuidv4();
        if (process.env.REACT_APP_DYNAMO_STORE === 'true') {
            const res = await putSurveyResult('expunge-screener', {
                ...survey.data,
                uuid,
            });
            /* TODO: set up cloudwatch error logging */
        }
        setCache({ uuid });
    }

    function handleValueChanged({ currentPageNo, data }) {
        setPage(currentPageNo + 1);
        setCache({ ...cache, currentPageNo, data });
    }

    function reset() {
        surveyModel.clear();
        setCache(null);
        setLoading(true);
        setFilteredOutcomeContent({});
        setOutcome(null);
        setPage(1);
        setScreenerStarted(false);
    }

    return (
        <div className="main">
            {outcome ? (
                <ScreenerOutcome
                    uuid={cache?.uuid}
                    outcomeContent={filteredOutcomeContent}
                    loading={loading}
                />
            ) : (
                <>
                    <ProgressBar percent={percentProgress} />
                    <Survey.Survey css={myCss} model={surveyModel} />
                </>
            )}

            <div className="text-center">
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
