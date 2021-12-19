import React from 'react';

function AssociationDifficult(props) {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <div className="h-100 mt-3 pt-5">
      <iframe
        key={1}
        title="association-difficult"
        className="h-100 w-100"
        src={`${host}gm/association-difficult/index.html`}
        frameBorder="0"
      ></iframe>
    </div>
  );
}

export default AssociationDifficult;
