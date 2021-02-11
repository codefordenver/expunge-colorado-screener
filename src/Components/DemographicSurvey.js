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
    const [cacheScreen, setCacheScreen] = useLocalStorage('screenerSurvey', null);
    let isComplete = false;

    async function handleComplete(survey) {
        let res = await putSurveyResult('demographic', {
            ...survey.data,
            uuid: cacheScreen.uuid || null,
        });
        isComplete = true;
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
