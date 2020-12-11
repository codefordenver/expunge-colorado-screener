import React from 'react';
import * as Survey from 'survey-react';
import SURVEY_DATA from '../data/survey.js';
import { useState, useEffect, useRef } from 'react';

function SurveyComponent() {
    function sendDataToServer(survey) {
        console.log(survey.data);
    }

    useEffect(() => {
        const defaultThemeColors = Survey.StylesManager.ThemeColors['default'];
        defaultThemeColors['$main-color'] = 'red';
        defaultThemeColors['$main-hover-color'] = 'green';
        defaultThemeColors['$text-color'] = 'yellow';
        defaultThemeColors['$header-color'] = 'pink';

        defaultThemeColors['$header-background-color'] = '#4a4a4a';
        defaultThemeColors['$body-container-background-color'] = '#f8f8f8';

        Survey.StylesManager.applyTheme();
    }, []);

    return <Survey.Survey json={SURVEY_DATA} onComplete={sendDataToServer} />;
}

export default SurveyComponent;
