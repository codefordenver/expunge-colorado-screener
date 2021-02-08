import React, { useState } from 'react';
import * as Survey from 'survey-react';
import { getSurveyResult, putSurveyResult } from '../api/apiSurveyService';
import useLocalStorage from '../hooks/useLocalStorage';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function DemographicSurvey({ surveyModel }) {
    const [results, setResults] = useState('');
    const [cacheScreen, setCacheScreen] = useLocalStorage('screenerSurvey', null);
    const [cacheDem, setCacheDem] = useLocalStorage('demographicSurvey', null);

    async function handleComplete(survey) {
        survey.data = { ...survey.data, uuid: cacheScreen.uuid || null };
        let res = await putSurveyResult('demographic', survey.data);
        setCacheDem({ ...cacheDem, uuid: cacheScreen.uuid });
        setResults(survey.data); //is this necessary anymore?
    }

    function handleValueChanged({ currentPageNo, data }) {
        setCacheDem({ ...cacheDem, currentPageNo, data });
    }

    return (
        <div>
            {!results ? (
                <Survey.Survey
                    css={myCss}
                    model={surveyModel}
                    onValueChanged={handleValueChanged}
                    onComplete={handleComplete}
                />
            ) : (
                'Thank you for providing the additional demographic information.'
            )}
        </div>
    );
}

export default DemographicSurvey;
