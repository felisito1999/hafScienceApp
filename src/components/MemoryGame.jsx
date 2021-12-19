import React from 'react';

const MemoryGame = (props) => {
  const host = process.env.REACT_APP_HOST_NAME; 
  return (
    <div className="h-100 mt-3 pt-5 pt-0">
    <iframe
        key={1}
        title="memory-game"
        className="h-100 w-100"
        src={`${host}gm/memory-game/index.html`}
        frameBorder="0"
    ></iframe>
</div>
  );
}

export default MemoryGame;