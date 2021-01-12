import React, { useState } from 'react';
import * as Survey from 'survey-react';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function DemographicSurveyComponent({ surveyModel }) {
    const [results, setResults] = useState('');

    function handleComplete(survey) {
        setResults(survey.data);
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

export default DemographicSurveyComponent;
