import ReactDOM from 'react-dom';
import React from 'react';
import SurveyComponent from './Components/SurveyComponent';
import './App.scss';

ReactDOM.render(
    <React.StrictMode>
        <div className="center-me">
            <SurveyComponent />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
