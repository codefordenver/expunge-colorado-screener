import * as Survey from 'survey-react';

import DEMOGRAPHIC_SURVEY_MODEL from '../data/demographicModel';
import DemographicSurvey from './DemographicSurvey';
import React from 'react';

const outcomeContent = {
    eligible: (
        <div>
            <h2>You are eligible!</h2>
            <div>blah blah blah</div>
        </div>
    ),
    needInfo: (
        <div>
            <h2>Need more info</h2>
            <div>go here ask this ....</div>
        </div>
    ),
    ineligible: (
        <div>
            <h2>Sorry not eligible</h2>
            <div>here are resources</div>
        </div>
    ),
};

const ScreenerOutcome = ({ type, uuid }) => {
    const demoSurveyModel = new Survey.Model(DEMOGRAPHIC_SURVEY_MODEL);
    return (
        <div>
            {outcomeContent[type]}
            <DemographicSurvey surveyModel={demoSurveyModel} uuid={uuid} />
        </div>
    );
};
export default ScreenerOutcome;
