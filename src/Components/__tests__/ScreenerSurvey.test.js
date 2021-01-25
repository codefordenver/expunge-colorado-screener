import * as Survey from 'survey-react';

import React from 'react';
import SCREENER_SURVEY_MODEL from '../../data/screenerModel';
import ScreenerSurvey from '../ScreenerSurvey';
import jsSHA from 'jssha';
import { shallow } from 'enzyme';

const setupSurveyParams = () => {
    const surveyModel = new Survey.Model(SCREENER_SURVEY_MODEL);
    const shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(JSON.stringify(SCREENER_SURVEY_MODEL));
    const hash = shaObj.getHash('HEX');
    return [surveyModel, hash];
};

it('renders without crashing', () => {
    const [surveyModel, hash] = setupSurveyParams();
    shallow(<ScreenerSurvey surveyModel={surveyModel} hash={hash} />);
});
