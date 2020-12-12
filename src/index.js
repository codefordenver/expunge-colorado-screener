import ReactDOM from 'react-dom';
import React from 'react';
import SurveyComponent from './Components/SurveyComponent';
import './App.scss';

ReactDOM.render(
    <React.StrictMode>
        <div className="app">
            <h1>Expunge Colorado Screener</h1>
            <div className="center-me">
                <SurveyComponent />
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
