import React, { useState } from 'react';
import * as Survey from 'survey-react';
import { getSurveyResult, putSurveyResult } from '../api/apiSurveyService';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function DemographicSurvey({ surveyModel, uuid }) {
    const [isComplete, setIsComplete] = useState(false);

    async function handleComplete(survey) {
        setIsComplete(true);
        if (process.env.REACT_APP_DYNAMO_STORE === 'true') {
            const res = await putSurveyResult('demographic', {
                ...survey.data,
                uuid: uuid || null,
            });
        }
    }

    return (
        <div>
            {!isComplete ? (
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
