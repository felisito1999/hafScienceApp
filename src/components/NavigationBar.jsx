import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { NavbarData } from '../data/NavbarData';
import { IoLogIn } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';
import { Dropdown } from 'react-bootstrap';
import { ImProfile } from 'react-icons/im';

const NavigationBar = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;

  return (
    <>
      <Navbar
        className="px-2 py-1"
        collapseOnSelect
        expand="lg"
        fixed="top"
        variant="light"
      >
        <Link to={`${host}`} className="navbar-brand">
          <HafIcon className="d-inline-block align-baseline me-1" width="35" height="35" />
          <span className="fw-bold align-baseline">HAF Science</span>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {NavbarData.map((navItem, index) => {
              if (
                navItem.roles.includes(
                  JSON.parse(localStorage.getItem('userData')).nombreRol
                )
              ) {
                if (navItem.childs) {
                  return (
                    //Arreglar que funcionen los links del dropdown
                    <NavDropdown
                      id="collasible-nav-dropdown"
                      title={navItem.title}
                      key={index}
                    >
                      {navItem.childs.map((child, childIndex) => {
                        return (
                          <NavDropdown.Item key={childIndex}>
                            <Link
                              key={childIndex}
                              to={child.path}
                              className={child.className}
                            >
                              {child.icon} <span>{child.title}</span>
                            </Link>
                          </NavDropdown.Item>
                        );
                      })}
                    </NavDropdown>
                  );
                } else {
                  return (
                    <Link
                      key={index}
                      to={navItem.path}
                      className={navItem.className}
                    >
                      {navItem.icon} <span>{navItem.title}</span>
                    </Link>
                  );
                }
              } else {
                return null;
              }
            })}
          </Nav>
          <Nav>
            {localStorage.getItem('token') != null &&
            localStorage.getItem('userData') != null ? (
              <>
                <Dropdown className="nav-link">
                  <Dropdown.Toggle
                    className="nav-link"
                    variant="success"
                    id="user-dropdown"
                  >
                    <FaUser />{' '}
                    <span className="pl-2">
                      {JSON.parse(localStorage.getItem('userData')).nombres}{' '}
                      {JSON.parse(localStorage.getItem('userData')).apellidos}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="bg-light border-0 p-2">
                    <Link to={`${host}perfil`} className="nav-link">
                      <ImProfile size={18} />{' '}
                      <span className="pl-2">Perfil</span>
                    </Link>
                    <Link
                      to={`${host}`}
                      onClick={props.handleLogout}
                      className="nav-link"
                    >
                      <BiLogOut size={20} />{' '}
                      <span className="pl-2">Cerrar sesión</span>
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                <IoLogIn /> <span>Iniciar sesión</span>
              </Link>
            )}
            {/* <Link to="/registro" className="nav-link"><FaUserCheck />  <span>Registrarse</span></Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavigationBar;
