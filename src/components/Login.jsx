import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios'; // eslint-disable-line
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';
import '../styles/Login.css';
import authService from '../services/authService.js';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();
  const handleUsernameChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const submitLogin = async (event) => {
    event.preventDefault();

    let requestStatus = await authService.signIn(username, password);

    if (requestStatus === 200) {
      const mainPath = process.env.REACT_APP_HOST_NAME;
      history.push(mainPath);
      props.setLoginState(true);
      props.setNavbarState(true);
      props.setFooterState(true);
    }
  };

  useEffect(() => {}, []); // eslint-disable-line

  return (
    <section id="login-form-container" className="bg-login">
      <div className="form-container">
        <div className="login-icon">
          <HafIcon />
        </div>
        <h1>Bienvenido a HAF Science</h1>
        <form autoComplete="off" className="form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              id="username"
              autoComplete="off"
              minLength="6"
              maxLength="25"
              onChange={handleUsernameChange}
              required
            />
            <label htmlFor="username" className="label-top">
              <span className="label-content">Nombre de usuario</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              minLength="6"
              maxLength="25"
              onChange={handlePasswordChange}
              required
            />
            <label htmlFor="username" className="label-top">
              <span className="label-content">Contraseña</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="mt-2">
            <Link 
            className="text-decoration-none text-center text-success"
            to={`${host}reset-password`} 
            >
             
              <p className="text-center">¿Olvidaste tu contraseña?</p>
            </Link>
            <button className="w-100 btn btn-success" onClick={submitLogin}>
              Iniciar sesión
            </button>
          </div>
          <div className="pt-5">
            <Link
              className="text-decoration-none text-center text-success"
              to={`${process.env.REACT_APP_HOST_NAME}`}
            >
              <p className="text-center">{'< Volver a la página principal'}</p>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
