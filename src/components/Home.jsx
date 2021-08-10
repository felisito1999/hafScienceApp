import React from 'react';
import '../styles/Home.css';
import {ReactComponent as PeriodicTableImageV1} from '../images/tabla-periodica.svg';
import {ReactComponent as PeriodicTableImageV2} from '../images/tabla-periodica-colorida.svg';

const Home = (props) => {
    return (
        <div className="h-100">
            <section id="welcome-banner" className="container rounded-3 shadow mt-5">
                <h2 id="welcome-banner-title" className="text-center pt-5 m-0">
                    Bienvenido a HAF Science
                </h2>
                <div className="d-flex align-items-center justify-content-center pt-5">
                    <PeriodicTableImageV1 height="100"/>
                    <PeriodicTableImageV2 height="100"/>
                </div>
                <p id="welcome-banner-text" className="pt-5 pb-5">
                    La tabla periódica es un cuadro que presenta todos los
                    elementos químicos que existen ordenados según sus
                    propiedades físicas. Fue diseñada por el químico ruso Dmitri
                    Mendeléiev en 1869 y es considerado por muchos como el
                    descubrimiento más importante de la química. Y es que esta
                    compleja ordenación de los elementos permitió predecir el
                    descubrimiento de nuevos elementos y permitió realizar
                    investigaciones teóricas sobre estructuras desconocidas
                    hasta el momento.
                </p>
            </section>
        </div>
    );
};

export default Home;
