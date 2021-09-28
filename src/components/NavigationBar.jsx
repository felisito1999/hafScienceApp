import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { NavbarData } from './NavbarData';
import { IoLogIn } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';

const NavigationBar = (props) => {
    const host = process.env.REACT_APP_HOST_NAME;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" fixed="top" variant="light">
                {/* <Container> */}
                <Link to={`${host}`} className="navbar-brand">
                    <HafIcon
                        className="d-inline-block align-to"
                        width="40"
                        height="40"
                    />
                    <span className="fw-bold">HAF Science</span>
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {NavbarData.map((navItem, index) => {
                            if (navItem.roles.includes(JSON.parse(localStorage.getItem('userData')).nombreRol)){
                                if (navItem.childs) {
                                    return (
                                        //Arreglar que funcionen los links del dropdown
                                        <NavDropdown
                                            id="collasible-nav-dropdown"
                                            title={navItem.title}
                                            key={index}
                                        >
                                            {navItem.childs.map(
                                                (child, childIndex) => {
                                                    return (
                                                        <NavDropdown.Item
                                                            key={childIndex}
                                                        >
                                                            <Link
                                                                key={childIndex}
                                                                to={child.path}
                                                                className={
                                                                    child.className
                                                                }
                                                            >
                                                                {child.icon}{' '}
                                                                <span>
                                                                    {child.title}
                                                                </span>
                                                            </Link>
                                                        </NavDropdown.Item>
                                                    );
                                                }
                                            )}
                                        </NavDropdown>
                                    );
                                } else {
                                    return (
                                        <Link
                                            key={index}
                                            to={navItem.path}
                                            className={navItem.className}
                                        >
                                            {navItem.icon}{' '}
                                            <span>{navItem.title}</span>
                                        </Link>
                                    );
                                }
                            }
                            else {
                                return null;
                            }
                        })}
                    </Nav>
                    <Nav>
                        {localStorage.getItem('token') != null &&
                        localStorage.getItem('userData') != null ? (
                            <>
                            <Link to="perfil" className="nav-link">
                                <FaUser/>{' '}
                                <span className="pl-2">{JSON.parse(localStorage.getItem('userData')).nombres} {JSON.parse(localStorage.getItem('userData')).apellidos}</span>
                            </Link>
                            <Link to={`${host}`} onClick={props.handleLogout} className="nav-link">
                                <BiLogOut />{' '}<span className="pl-2">Cerrar sesión</span>
                            </Link>
                            </>
                        ) : (
                            <Link to="/login" className="nav-link">
                                <IoLogIn />{' '}<span>Iniciar sesión</span>
                            </Link>
                        )}
                        {/* <Link to="/registro" className="nav-link"><FaUserCheck />  <span>Registrarse</span></Link> */}
                    </Nav>
                </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
        </>
    );
};

export default NavigationBar;
