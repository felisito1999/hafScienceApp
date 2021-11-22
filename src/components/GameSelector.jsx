import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PuzzleSelector from './PuzzleSelector';
import { ReactComponent as PuzzleIcon } from '../images/rompecabezas.svg';
import { ReactComponent as Agrupamiento } from '../images/agrupamiento.svg';
import { ReactComponent as Memoria } from '../images/brain-svgrepo-com.svg';
import { ReactComponent as Atrapar } from '../images/catch-game.svg';
import AssociationSelector from './AssociationSelector';
import MemorySelector from './MemorySelector';
import AtraparElementos from './AtraparElementos';

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
            <div className="py-5 d-flex flex-column align-items-center">
              <Link
                to={`${host}juegos/rompecabezas`}
                className="d-flex flex-column pb-3 text-dark text-decoration-none"
              >
                <PuzzleIcon height="100"/>
                <span className="text-center w-100 fw-bold">
                  Rompecabezas
                </span>
              </Link>
              <Link
                to={`${host}juegos/asociaciones`}
                className="pt-3 d-flex flex-column text-dark text-decoration-none"
              >
                <Agrupamiento height="100"/>
                <span className="text-center w-100 fw-bold">
                  Asociación
                </span>
              </Link>
              <Link
                to={`${host}juegos/memoria`}
                className="pt-3 d-flex flex-column text-dark text-decoration-none"
              >
                <Memoria height="100"/>
                <span className="text-center w-100 fw-bold">
                  Memoria
                </span>
              </Link>
              <Link 
                to={`${host}juegos/atraparelementos`}
                className="pt-3 d-flex flex-column text-dark text-decoration-none">
                  <Atrapar height="100"/>
                  <span className="text-center w-100 fw-bold">
                    Atrapa elementos
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
      <Route path={`${host}juegos/atraparelementos`}>
        <AtraparElementos />
      </Route>
    </Switch>
  );
};

export default GameSelector;
