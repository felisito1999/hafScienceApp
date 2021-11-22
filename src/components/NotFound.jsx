import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ErrorIcon } from '../images/404-error-icon.svg';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const NotFound = () => {
  const host = process.env.REACT_APP_HOST_NAME;
  const [counter, setCounter] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const timer =
      counter >= 0 &&
      setInterval(() => {
        if(counter == 0){
          history.push(host)
        }
        setCounter(counter - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div className="component-wrapper">
      <article className="container d-flex flex-column bg-light rounded-3 shadow">
        <section className="text-center d-flex justify-content-center align-items-center pt-5">
          <div className="p-2">
            <ErrorIcon height="100" />
          </div>
          <div className="p-2">
            <h1>404</h1>
            <h3>Página no encontrada</h3>
          </div>
        </section>
        <section className="text-center align-items-center">
          <div className="p-2">
            <p>
              No pudimos encontrar la página que está solicitando. Puede
              dirigirse a la página principal, a la página anterior o
              contactarse con nuestro equipo de soporte.
            </p>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center mt-3">
            <p className="fw-bold">Será redirigido a la página principal en {counter} segundos</p>
            <AiOutlineLoading3Quarters
              size={50}
              className="rotating-icon m-5"
            />
          </div>
        </section>
      </article>
    </div>
  );
};

export default NotFound;
