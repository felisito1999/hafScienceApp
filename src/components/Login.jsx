import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';
import '../styles/Login.css';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event) => {
        event.preventDefault();
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        event.preventDefault();
        setPassword(event.target.value);
    }

    const submitLogin = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        }

        console.log(data);
    }

    return (
        <section className="container">
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
                            <span className="label-content">
                                Nombre de usuario
                            </span>
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
                    <div className="form-group">
                        <button
                            className="sign-in-button"
                            onClick={submitLogin}
                        >Iniciar sesión</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
