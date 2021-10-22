import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import authService from '../services/authService';
import usersComponents from '../data/usersComponents';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const getLoginState = async () => {
        const state = await authService.isSignedIn();

        return state.value;
    };

    const { isLoggedIn } = getLoginState();
    const host = process.env.REACT_APP_HOST_NAME;

    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('token') !== null) {
                    if (usersComponents.adminComponents.includes(Component.name)) {
                        if (
                            JSON.parse(localStorage.getItem('userData'))
                                .nombreRol === 'Administrador'
                        ) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={`${host}`} />;
                        }
                    } else if (usersComponents.teacherComponents.includes(Component.name)) {
                        if (
                            JSON.parse(localStorage.getItem('userData'))
                                .nombreRol === 'Docente'
                        ) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={`${host}`} />;
                        }
                    } else if (usersComponents.studentComponents.includes(Component.name)) {
                        if (
                            JSON.parse(localStorage.getItem('userData'))
                                .nombreRol === 'Estudiante'
                        ) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={`${host}`} />;
                        }
                    } else if (Login.name === Component.name) {
                        return <Redirect to={`${host}`} />;
                    } else {
                        return <Component {...props} />;
                    }
                } else {
                    return <Redirect to={`${host}login`} />;
                }
            }}
        />
    );
};

export default ProtectedRoute;
