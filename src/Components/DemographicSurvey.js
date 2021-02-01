import React, { useState } from 'react';
import * as Survey from 'survey-react';
import { getSurveyResult, putSurveyResult } from '../api/apiSurveyService';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function DemographicSurvey({ surveyModel }) {
    const [results, setResults] = useState('');

    function handleComplete(survey) {
        setResults(survey.data);
    }

    async function handleComplete(survey) {
        let res = await putSurveyResult('demographic', survey.data);
        setResults({ uuid: uuid, ...survey.data });
    }

    return (
        <div>
            {!results ? (
                <Survey.Survey
                    css={myCss}
                    model={surveyModel}
                    onComplete={handleComplete}
                />
            ) : (
                'Thank you for providing the additional demographic information.'
            )}
        </div>
    );
}

export default DemographicSurvey;
