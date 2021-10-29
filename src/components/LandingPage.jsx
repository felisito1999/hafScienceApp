import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import PeriodicTable from '../components/PeriodicTable';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';
import Footer from './Footer';

const LandingPage = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  return (
    <div>
      <div id="landing-page">
        <div className="">
          <Navbar
            id="landing-page-navbar"
            className="px-4 w-100"
            collapseOnSelect
            expand="lg"
            variant="light"
          >
            <Link to={`${host}`} className="navbar-brand">
              <HafIcon
                className="d-inline-block align-top"
                width="40"
                height="40"
              />
              <span className="fw-bold text-light">HAF Science</span>
            </Link>
            <Navbar.Toggle
              className="text-center"
              aria-controls="responsive-navbar-nav"
            />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Link to={`${host}login`} className="text-light nav-link">
                  <FaUser /> <span>Iniciar sesión</span>
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <article className="pb-5 container w-100">
            <section className="py-5">
              <h1 className="mb-5 text-center text-light fw-bold">
                Bienvenido a Haf Science
              </h1>
              <p className="text-center text-light">
                Es un placer invitarte a nuestra plataforma, donde el
                conocimiento de la tabla periódica se transmite de la mejor
                forma posible. Para disfrutar de toda la experiencia inicia
                sesión.
              </p>
            </section>
            <section className="d-flex justify-content-center align-items-center">
              <Link
                to={`${host}login`}
                className="btn btn-outline-success text-light w-50"
              >
                <h4 className="fw-bold">Iniciar sesión</h4>
              </Link>
            </section>
          </article>
          <article className="py-5 bg-light w-100">
            <section className="container">
              <h1 className="mb-5 text-center text-dark fw-bold">
                Tabla periódica
              </h1>
              <p className="text-center text-dark">
                La tabla periódica es un cuadro que presenta todos los elementos
                químicos que existen ordenados según sus propiedades físicas.
                Fue diseñada por el químico ruso Dmitri Mendeléiev en 1869 y es
                considerado por muchos como el descubrimiento más importante de
                la química. Y es que esta compleja ordenación de los elementos
                permitió predecir el descubrimiento de nuevos elementos y
                permitió realizar investigaciones teóricas sobre estructuras
                desconocidas hasta el momento.
              </p>
              <p className="text-center text-dark">
                En <span className="fw-bolder">Haf Science</span> podrás
                desarrollar tus conocimientos sobre la tabla periódica, a
                continuación te presentamos una de las herramientas que
                utilizamos:
              </p>
            </section>
            <section className="py-5 bg-opacity-50 bg-light bg-opacity-50 w-100">
              <PeriodicTable />
            </section>
          </article>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
