import React from 'react';

const MemoryGame = (props) => {
  const host = process.env.REACT_APP_HOST_NAME; 
  return (
    <div className="h-100 component-wrapper pt-0">
    <iframe
        key={1}
        title="memory-game"
        className="h-100 w-100"
        src={`${host}memory-game/memoria-sup-facil.html`}
        frameBorder="0"
    ></iframe>
</div>
  );
}

export default MemoryGame;