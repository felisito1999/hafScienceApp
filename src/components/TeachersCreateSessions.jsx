import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import sessionsService from '../services/sessionsService';
import userService from '../services/usersService';

const TeachersCreateSessions = (props) => {
    const history = useHistory();

    const [session, setSesssion] = useState({
        nombre: '',
        descripcion: '',
        estudiantes: [],
    });

    const [searchParameters, setSearchParameters] = useState({
        name: '',
    });

    const [usersPage, setUsersPage] = useState(1);
    const [usersPageSize, setUsersPageSize] = useState(10);

    const getUsers = async (page, pageSize, searchParameters) => {
        const users = await userService.getAllPaginatedUsersBy(
            page,
            pageSize,
            searchParameters
        );
        console.log(users);
        setSesssion({
            ...session,
            estudiantes: users,
        });
    };

    const handleStudentsAdd = (student) => {
        const newEstudiantes = session.estudiantes;
        newEstudiantes.push(student);

        console.log(newEstudiantes);

        setSesssion({
            ...session,
            estudiantes: newEstudiantes,
        });
    };

    const handleStudentsRemove = (student) => {
        const newEstudiantes = session.estudiantes.filter(
            (value, index, array) => {
                return value.id != student.id;
            }
        );

        console.log(newEstudiantes);

        setSesssion({
            ...session,
            estudiantes: session.estudiantes.filter((value, index, array) => {
                return value.id !== student.id;
            }),
        });
    };

    const handleNombreChange = (e) => {
        setSesssion({
            ...session,
            nombre: e.target.value,
        });
    };

    const handleDescripcionChange = (e) => {
        setSesssion({
            ...session,
            descripcion: e.target.value,
        });
    };

    const handleUserNameChange = (e) => {
        setSearchParameters({
            ...searchParameters,
            name: e.target.value,
        });
    };

    const handleNewUsersSearch = async (e) => {
        e.preventDefault();
        getUsers(1, usersPageSize, searchParameters);
        setUsersPage(1);
    };

    const handleSessionSubmit = async () => {
        const result = await sessionsService.saveSession(session);
        console.log(result);
    };

    useEffect(() => {
        getUsers(usersPage, usersPageSize, searchParameters);
    }, []);
    return (
        <div className="component-wrapper">
            <div className="container banner-bg rounded-3 shadow py-3 my-5">
                <h1 className="text-center">Agregar sesiones</h1>
                <div className="row justify-content-center">
                    <section className="p-4 m-1 rounded bg-light col-12 col-md-5">
                        <h6 className="text-center fw-bold">Detalles</h6>
                        <form
                            autoComplete="off"
                            className="form"
                            onSubmit={handleSessionSubmit}
                        >
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="nombre"
                                    id="nombre"
                                    value={session.nombre}
                                    autoComplete="off"
                                    minLength="2"
                                    maxLength="50"
                                    onChange={handleNombreChange}
                                    required
                                />
                                <label htmlFor="nombres" className="label-top">
                                    <span className="label-content">
                                        Nombre de sesión
                                    </span>
                                </label>
                                <div className="underline"></div>
                            </div>
                            <div className="form-group mt-5">
                                <label
                                    htmlFor="direccion"
                                    className="form-label mb-4"
                                >
                                    <span>Descripción</span>
                                </label>
                                <textarea
                                    type="text"
                                    name="direccion"
                                    id="direccion"
                                    className="form-control"
                                    autoComplete="off"
                                    minLength="25"
                                    maxLength="128"
                                    rows="5"
                                    style={{
                                        resize: 'none',
                                        position: 'relative',
                                    }}
                                    onChange={handleDescripcionChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="pt-5 mt-5"></div>
                        </form>
                    </section>
                    <section className="p-4 m-1 rounded bg-light col-12 col-md-6">
                    <h6 className="text-center fw-bold">Usuarios</h6>
                        <form onSubmit={handleNewUsersSearch}>
                            <div className="d-flex">
                                <div className="py-2 pr-2 flex-grow-1">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        className="form-control"
                                        onChange={handleUserNameChange}
                                    />
                                </div>
                                <div className="p-2">
                                    <button className="btn btn-success">
                                        Buscar
                                    </button>
                                </div>
                            </div>
                        </form>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </section>
                    <div className="d-flex justify-content-between mt-5">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={props.onHide}
                        >
                            cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            Agregar sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeachersCreateSessions;
