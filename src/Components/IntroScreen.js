import React from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const IntroScreen = ({ setScreenerStarted, introContent }) => {
    return (
        <div className="container">
            <h2>{introContent.title}</h2>
            <p>
                {documentToReactComponents(
                    introContent.description,
                    richTextRenderOptions
                )}
            </p>
            <button className="btn-nav" onClick={() => setScreenerStarted(true)}>
                Next
            </button>
        </div>
    );
};

export default IntroScreen;

const richTextRenderOptions = {
    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const { file } = node.data.target.fields;
            return <img src={file.url} />;
        },
    },
};
