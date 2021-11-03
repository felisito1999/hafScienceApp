import React from 'react';

const AtraparElementos = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <div className="component-wrapper">
      <iframe className="vh-100 w-100" src={`${host}atraparElementos.html`} frameborder="0"></iframe>
    </div>
  );
}

export default AtraparElementos;