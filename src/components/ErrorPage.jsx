import React from 'react';
import { ReactComponent as ErrorIcon } from '../images/404-error-icon.svg';

const ErrorPage = () => {
    return (
        <div className="h-100">
            <article className="container d-flex flex-column bg-light rounded-3 shadow mt-5 mb-5">
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
                            No pudimos encontrar la página que está solicitando.
                            Puede dirigirse a la página principal, a la página
                            anterior o contantarse con nuestro equipo de
                            soporte.
                        </p>
                    </div>
                </section>
            </article>
        </div>
    );
};

export default ErrorPage;
