import React from 'react';
import { ReactComponent as Number1 } from '../images/number-1-svgrepo-com.svg'
import { ReactComponent as Number2 } from '../images/number-2-svgrepo-com.svg'
import { Switch, Route, Link } from 'react-router-dom';
import MemoryEasy from './MemoryEasy';

const MemorySelector = (props) => {
    const host = process.env.REACT_APP_HOST_NAME;
    return (
        <Switch>
        <Route exact path={`${host}juegos/memoria`}>
            <div className="component-wrapper">
                <section className="banner-bg container rounded-3 shadow py-5 my-5">
                    <h1 className="banner-title text-center">
                        Seleccione el juego de memoria al que desea acceder
                    </h1>
                    <div className="d-flex flex-lg-row flex-sm-column flex-column align-items-center justify-content-center pt-5 container">
                        <Link
                            to={`${host}juegos/memoria/nivelfacil`}
                            className="p-3 d-flex flex-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none"
                        >
                            <Number1 height="100" />
                            <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                                Nivel fácil
                            </span>
                        </Link>
                        <Link 
                            to={`${host}juegos/memoria/niveldificil`}
                            className="p-3 d-flex flex-row flex-md-column align-items-center justify-content-center text-dark text-decoration-none">
                            <Number2 height="100" />
                            <span className="flex-sm-grow-1 text-center flex-md-grow-0 w-100 fw-bold">
                                Nivel difícil
                            </span>
                        </Link>
                    </div>
                </section>
            </div>
        </Route>
        <Route path={`${host}juegos/memoria/nivelfacil`}>
            <MemoryEasy />
        </Route>
        <Route path={`${host}juegos/memoria/niveldificil`}>
            {/* <PuzzleGameDifficult /> */}
        </Route>
    </Switch>
    );
}

export default MemorySelector;