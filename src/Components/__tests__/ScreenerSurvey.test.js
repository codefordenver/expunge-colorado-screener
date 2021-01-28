import * as Survey from 'survey-react';

import React from 'react';
import SCREENER_SURVEY_MODEL from '../../data/screenerModel';
import ScreenerSurvey from '../ScreenerSurvey';
import jsSHA from 'jssha';
import { render } from '@testing-library/react';

const setupSurveyParams = () => {
    const surveyModel = new Survey.Model(SCREENER_SURVEY_MODEL);
    const shaObj = new jsSHA('SHA-1', 'TEXT');
    shaObj.update(JSON.stringify(SCREENER_SURVEY_MODEL));
    const hash = shaObj.getHash('HEX');
    return [surveyModel, hash];
};

it('renders without crashing', () => {
    const [surveyModel, version] = setupSurveyParams();
    render(<ScreenerSurvey surveyModel={surveyModel} version={version} />);
});
