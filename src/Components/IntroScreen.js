import React, { useState, useEffect } from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import { getContent } from '../api/apiContentService';

const IntroScreen = ({ setScreenerStarted }) => {
    return (
        <div className="container">
            <h2>Tell us some more about your case.</h2>
            <p>
                The following eligibility screener is for informational purposes only and
                is not meant to be interpreted as a definitive answer.
            </p>
            <button className="btn-nav" onClick={() => setScreenerStarted(true)}>
                Next
            </button>
        </div>
    );
};

export default IntroScreen;
