import React from 'react';
import { Route } from 'react-router-dom'
const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={props => {
            return <Component {...props} />
        }}>

        </Route>
    );
}

export default ProtectedRoute;