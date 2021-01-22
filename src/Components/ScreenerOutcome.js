import React from 'react';
import * as Survey from 'survey-react';
import DemographicSurvey from './DemographicSurvey';
import DEMOGRAPHIC_SURVEY_DATA from '../data/demoSurvey';

const demoSurveyModel = new Survey.Model(DEMOGRAPHIC_SURVEY_DATA);

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

const OutcomeComponent = ({ type }) => {
    return (
        <div>
            {outcomeContent[type]}
            <DemographicSurvey surveyModel={demoSurveyModel} />
        </div>
    );
};
export default OutcomeComponent;
