import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';

const LoginRoute = ({ component: LoginComponent, ...rest }) => {
    const host = process.env.REACT_APP_HOST_NAME;
    const propRest = {...rest}
    return (
        <Route
            {...rest}
            render={props =>
                propRest.isLoggedIn ? (
                    <Redirect to={`${host}`} />
                ) : (
                    <LoginComponent {...props} {...rest}/>
                )
            }
        />
    );
};

export default LoginRoute;
