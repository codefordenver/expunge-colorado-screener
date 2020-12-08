import ReactDOM from 'react-dom';
import React from 'react';
import SurveyComponent from './Components/SurveyComponent';
import './App.css';

ReactDOM.render(
    <React.StrictMode>
        <div class="center-me">
            <SurveyComponent />
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);
