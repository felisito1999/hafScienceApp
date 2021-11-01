import React from 'react';
import { ReactComponent as Number1 } from '../images/number-1-svgrepo-com.svg';
import { ReactComponent as Number2 } from '../images/number-2-svgrepo-com.svg';
import { Link, Route, Switch } from 'react-router-dom';
import AssociationEasy from './AssociationEasy';
import AtraparElementos from './AtraparElementos';
import { IoLogoGameControllerB, IoLogoGameControllerA } from 'react-icons/io'
import { SiGamejolt } from 'react-icons/si'

const AssociationSelector = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <Switch>
      <Route exact path={`${host}juegos/asociaciones`}>
        <div className="component-wrapper">
          <section className="banner-bg container rounded-3 shadow py-5 my-5">
            <h1 className="banner-title text-center">
              Seleccione el juego de asociación al que desea acceder
            </h1>
            <div className="d-flex flex-lg-row flex-sm-column flex-column align-items-center justify-content-center pt-5 container">
              <Link
                to={`${host}juegos/asociaciones/nivelfacil`}
                className="p-3 d-flex flex-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none"
              >
                <IoLogoGameControllerA size="100" />
                <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                  Encuetra elementos
                </span>
              </Link>
              <Link
                to={`${host}juegos/asociaciones/niveldificil`}
                className="p-3 d-flex flex-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none"
              >
                <IoLogoGameControllerB size="100" />
                <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                  Atrapa elementos
                </span>
              </Link>
            </div>
          </section>
        </div>
      </Route>
      <Route path={`${host}juegos/asociaciones/nivelfacil`}>
        <AssociationEasy />
      </Route>
      <Route path={`${host}juegos/asociaciones/niveldificil`}>
        <AtraparElementos />
      </Route>
    </Switch>
  );
};

export default AssociationSelector;
