import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { NavbarData } from './NavbarData';
import { IoLogIn } from 'react-icons/io5';
import { FaUserCheck } from 'react-icons/fa';
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';

const NavigationBar = (props) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" fixed="top" variant="light">
                {/* <Container> */}
                <Link to="/" className="navbar-brand">
                    <HafIcon
                        className="d-inline-block align-to"
                        width="40"
                        height="40"
                    />
                    HAF SCIENCE
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {NavbarData.map((navItem, index) => {
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
                                                    <NavDropdown.Item key={childIndex}>
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
                        })}

                        {/* <NavDropdown
                                title="Dropdown"
                                id="collasible-nav-dropdown"
                            >
                                <NavDropdown.Item href="#action/3.1">
                                    Action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">
                                    Something
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown> */}
                    </Nav>
                    <Nav>
                        <Link to="/login" className="nav-link">
                            <IoLogIn /> <span>Iniciar sesión</span>
                        </Link>
                        {/* <Link to="/registro" className="nav-link"><FaUserCheck />  <span>Registrarse</span></Link> */}
                    </Nav>
                </Navbar.Collapse>
                {/* </Container> */}
            </Navbar>
        </>
    );
};

export default NavigationBar;
