import React from 'react';

const AssociationEasy = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <div className="h-100 mt-3 pt-5 mb-0">
      <iframe
        key={1}
        title="puzzle-easy"
        className="h-100 w-100"
        src={`${host}gm/association-easy/index.html`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default AssociationEasy;
