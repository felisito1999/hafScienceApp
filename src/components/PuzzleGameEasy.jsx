import React from 'react';

const PuzzleGameEasy = (props) => {
    const host = process.env.REACT_APP_HOST_NAME;
    
    return (
        <div className="h-100 component-wrapper pt-5">
            <iframe key={1} title="puzzle-easy" className="h-100 w-100" src={`${host}gm/puzzle-easy/index.html`} frameBorder="0"></iframe>
        </div>
    );
}

export default PuzzleGameEasy;