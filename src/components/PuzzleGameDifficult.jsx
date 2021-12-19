import React from 'react';

const PuzzleGameDifficult = () => {
   
    const host = process.env.REACT_APP_HOST_NAME;
    
    return (
        <div className="h-100 mt-3 pt-5">
            <iframe key={1} title="puzzle-difficult" className="h-100 w-100" src={`${host}gm/puzzle-difficult/index.html`} frameBorder="0"></iframe>
        </div>
    );
};

export default PuzzleGameDifficult;
