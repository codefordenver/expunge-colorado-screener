import React, { useState, useEffect } from 'react';
import * as Survey from 'survey-react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import DEMOGRAPHIC_SURVEY_MODEL from '../data/demographicModel';
import DemographicSurvey from './DemographicSurvey';
import { getContent } from '../api/apiContentService';

const titleMap = {
    eligible: 'Eligible',
    needInfo: 'Need more information',
    ineligible: 'Not eligible',
};

const ScreenerOutcome = ({ type, uuid }) => {
    const demoSurveyModel = new Survey.Model(DEMOGRAPHIC_SURVEY_MODEL);
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(async () => {
        setLoading(true);
        try {
            const res = await getContent();
            const entry = res.data.find((item) => item.fields.id === type).fields;
            setContent(entry);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <div>
            <div className="container outcome">
                {loading && 'Loading more info...'}
                {content && (
                    <>
                        <h2>{content.title}</h2>
                        {documentToReactComponents(content.body, richTextRenderOptions)}
                    </>
                )}
                {error && (
                    <>
                        <h2>{titleMap[type]}</h2>
                        <h4>
                            Unable to load additional information. Please contact us at{' '}
                            <a href="https://expungecolorado.org">expungecolorado.org</a>
                        </h4>
                    </>
                )}
            </div>
            <DemographicSurvey surveyModel={demoSurveyModel} uuid={uuid} />
        </div>
    );
};

export default ScreenerOutcome;

const richTextRenderOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { file } = node.data.target.fields;
            return <img src={file.url} />;
        },
    },
};
