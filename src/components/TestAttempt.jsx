import React from 'react';

const host = process.env.REACT_APP_HOST_NAME;

const TestAttempt = (props) => {
    return (
        <div className="pt-5 h-100">
            <iframe
                key={1}
                className="h-100 w-100"
                src={`${host}quiz.html`}
                frameborder="0"
            ></iframe>
        </div>
    );
};

export default TestAttempt;
