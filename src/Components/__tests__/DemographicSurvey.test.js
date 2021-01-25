import * as Survey from 'survey-react';

import DEMOGRAPHIC_SURVEY_MODEL from '../../data/demographicModel';
import DemographicSurvey from '../DemographicSurvey';
import React from 'react';
import { shallow } from 'enzyme';

const setupSurveyParams = () => {
    return new Survey.Model(DEMOGRAPHIC_SURVEY_MODEL);
};

it('renders without crashing', () => {
    const surveyModel = setupSurveyParams();
    shallow(<DemographicSurvey surveyModel={surveyModel} />);
});
