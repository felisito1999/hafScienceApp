import React from 'react';

const PuzzleGameDifficult = () => {
   
    const host = process.env.REACT_APP_HOST_NAME;
    
    return (
        <div className="h-100 component-wrapper">
            <iframe key={1} className=" h-100 w-100" src={`${host}puzzle.html`} frameBorder="0"></iframe>
        </div>
    );
};

export default PuzzleGameDifficult;
