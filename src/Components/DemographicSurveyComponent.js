import React, { useState, useEffect } from 'react';
import * as Survey from 'survey-react';

const myCss = {
    navigationButton: 'btn-nav',
    header: 'header',
    container: 'container',
};

function DemographicSurveyComponent({ surveyModel }) {
    const [outcome, setOutcome] = useState('');

    function handleComplete(survey) {
        setOutcome(survey.data.outcome);
    }

    /* TODO/fix: if this is called *after* completing the survey,
       it resets everything except for question visibility on page 0
       (but corrects itself as soon as you try to select something) */
    function reset() {
        surveyModel.clear();
        setOutcome(null);
    }

    return (
        <div>
            {!outcome ? (
                <Survey.Survey
                    css={myCss}
                    model={surveyModel}
                    onComplete={handleComplete}
                />
            ) : (
                'Thank you for providing the additional demographic information.'
            )}
            <button onClick={reset} className="btn-nav">
                Reset
            </button>
        </div>
    );
}

export default DemographicSurveyComponent;
