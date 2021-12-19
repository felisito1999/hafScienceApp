import React from 'react';

const AtraparElementos = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <div className="h-100 mt-3 pt-5">
      <iframe className="vh-100 w-100" title="catch-game" src={`${host}gm/catch-game/index.html`} frameborder="0"></iframe>
    </div>
  );
}

export default AtraparElementos;