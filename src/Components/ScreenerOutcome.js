import React, { useState, useEffect } from 'react';
import * as Survey from 'survey-react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import DEMOGRAPHIC_SURVEY_MODEL from '../data/demographicModel';
import DemographicSurvey from './DemographicSurvey';

const ScreenerOutcome = ({ type, uuid, outcomeContent, loading }) => {
    const demoSurveyModel = new Survey.Model(DEMOGRAPHIC_SURVEY_MODEL);

    return (
        <div>
            <div className="container outcome">
                {loading ? (
                    'Loading more info...'
                ) : (
                    <>
                        <h2>{outcomeContent.title}</h2>
                        {documentToReactComponents(
                            outcomeContent.body,
                            richTextRenderOptions
                        )}
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
