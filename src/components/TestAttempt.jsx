import React, { useState, useEffect } from 'react';

const TestAttempt = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const [test, setTest] = useState(null)
  
  useEffect(() => {

  }, [])
  
  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5"></section>
    </div>
  );
};

export default TestAttempt;
