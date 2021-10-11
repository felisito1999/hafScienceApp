import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SchoolsDashboard from './SchoolsDashboard';
import UserDetailsModal from './UserDetailsModal';
import UsersDashboard from './UsersDashboard';
import SchoolsDetailsModal from './SchoolDetailsModal';
import PuzzleGameDifficult from './PuzzleGameDifficult';
import PuzzleGameEasy from './PuzzleGameEasy';
import PuzzleSelector from './PuzzleSelector';
import GameSelector from './GameSelector';
import TestAttempt from './TestAttempt';
import Login from './Login';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const host = process.env.REACT_APP_HOST_NAME;

    const adminComponents = [
        UsersDashboard.name,
        UserDetailsModal.name,
        SchoolsDashboard.name,
        SchoolsDetailsModal.name,
    ];

    const teacherComponents = [];

    const studentsComponents = [
        TestAttempt.name,
        GameSelector.name,
        PuzzleGameDifficult.name,
        PuzzleGameEasy.name,
        PuzzleSelector.name,
    ];

    return (
        <Route
            {...rest}
            render={(props) => {
                if (localStorage.getItem('token') !== null) {
                    if (adminComponents.includes(Component.name)) {
                        if (
                            JSON.parse(localStorage.getItem('userData'))
                                .nombreRol === 'Administrador'
                        ) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={`${host}`} />;
                        }
                    } else if (teacherComponents.includes(Component.name)) {
                        if (
                            JSON.parse(localStorage.getItem('userData'))
                                .nombreRol === 'Docente'
                        ) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={`${host}`} />;
                        }
                    } else if (studentsComponents.includes(Component.name)) {
                        if (
                            JSON.parse(localStorage.getItem('userData'))
                                .nombreRol === 'Estudiante'
                        ) {
                            return <Component {...props} />;
                        } else {
                            return <Redirect to={`${host}`} />;
                        }
                    }else if (Login.name === Component.name){
                        return <Redirect to={`${host}`}/>
                    }
                     else {
                        return <Component {...props} />;
                    }
                } else {
                    return <Redirect to={`${host}login`} />;
                }
            }}
        ></Route>
    );
};

export default ProtectedRoute;
