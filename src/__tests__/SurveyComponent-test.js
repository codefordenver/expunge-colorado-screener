import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import SurveyComponent from '../Components/SurveyComponent';
import SURVEY_DATA from '../data/survey.js';
import * as Survey from 'survey-react';

const surveyModel = new Survey.Model(SURVEY_DATA);

afterEach(cleanup);

it('Question 1 Answer Yes, reveals next question', () => {
    const survey = render(<SurveyComponent surveyModel={surveyModel} />);
    console.log(survey);
});
