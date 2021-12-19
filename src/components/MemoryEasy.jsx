import React from 'react';

const MemoryEasy = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <div className="h-100 pt-5">
    <iframe
        key={1}
        title="memory-easy"
        className="h-100 w-100"
        src={`${host}gm/memory-demo/index.html`}
        frameBorder="0"
    ></iframe>
</div>
  );
}

export default MemoryEasy;