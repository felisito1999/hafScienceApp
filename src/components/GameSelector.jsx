import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PuzzleSelector from './PuzzleSelector';
import { ReactComponent as PuzzleIcon } from '../images/rompecabezas.svg';
import { ReactComponent as Agrupamiento } from '../images/agrupamiento.svg';
import { ReactComponent as Memoria } from '../images/brain-svgrepo-com.svg';
import AssociationSelector from './AssociationSelector';
import MemorySelector from './MemorySelector';

const GameSelector = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;

  return (
    <Switch>
      <Route exact path={`${host}juegos`}>
        <div className="component-wrapper">
          <section className="banner-bg container rounded-3 shadow py-5 my-5">
            <h1 className="banner-title text-center">
              Seleccione el juego al que desea acceder
            </h1>
            <div className="d-flex flex-lg-row justify-content-lg-between flex-sm-column flex-column justify-content-center pt-5 container">
              <Link
                to={`${host}juegos/rompecabezas`}
                className="pb-3 d-flex flex-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none"
              >
                <PuzzleIcon height="100" />
                <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                  Rompecabezas
                </span>
              </Link>
              <Link
                to={`${host}juegos/asociaciones`}
                className="pt-3 d-flex flex-row flex-sm-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none"
              >
                <Agrupamiento height="100" />
                <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                  Asociación
                </span>
              </Link>
              <Link
                to={`${host}juegos/memoria`}
                className="pt-3 d-flex flex-row flex-sm-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none"
              >
                <Memoria height="100" />
                <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                  Memoria
                </span>
              </Link>
            </div>
          </section>
        </div>
      </Route>
      <Route path={`${host}juegos/rompecabezas`}>
        <PuzzleSelector />
      </Route>
      <Route path={`${host}juegos/asociaciones`}>
        <AssociationSelector />
      </Route>
      <Route path={`${host}juegos/memoria`}>
        <MemorySelector />
      </Route>
    </Switch>
  );
};

export default GameSelector;
