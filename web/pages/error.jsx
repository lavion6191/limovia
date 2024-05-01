// Error.jsx
import React from 'react';
import SEO from 'ui/SEO';

const Error = ({ http, title, description }) => {
    return (
        <>
            {/* Head */}
            <SEO
                title={`${http} - ${title}`}
                description={description}
            />

            {/* Body */}
            {http} - {title}
            {/* Render HTML tags */}
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </>
    );
};

export default Error;
