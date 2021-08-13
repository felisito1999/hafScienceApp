import React from 'react';

const PuzzleGame = () => {
   
    const host = process.env.REACT_APP_HOST_NAME;
    
    return (
        <div className=" h-100">
            <iframe key={1} className=" h-100 w-100" src={`${host}puzzle.html`} frameborder="0"></iframe>
        </div>
    );
};

export default PuzzleGame;
