import React, { useEffect, useState } from 'react';
import sessionsService from '../services/sessionsService';
import userService from '../services/usersService';

const TeachersCreateSessions = (props) => {
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
                return value.id != student.id;
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

    const handleSessionSubmit = async () => {
        const result = await sessionsService.saveSession(session);
        console.log(result);
    };

    useEffect(() => {
        const getUsers = async (page, pageSize, searchParameters) => {
            const users = await userService.getAllPaginatedUsersBy(
                page,
                pageSize,
                searchParameters
            );

            setSesssion({
                ...session,
                estudiantes: users,
            });
        };

        getUsers(usersPage, usersPageSize, searchParameters);
    }, []);
    return (
        <div className="component-wrapper">
            <h1 className="text-center">Agregar sesiones</h1>
            <div className="container">
                <div className="row">
                    <section className="p-4 m-1 rounded banner-bg col-12 col-md-5">
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
                                    rows="2"
                                    onChange={handleDescripcionChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mt5"></div>
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
                                    onClick={() => {}}
                                >
                                    Agregar sesión
                                </button>
                            </div>
                        </form>
                    </section>
                    <section className="p-4 m-3 rounded banner-bg col-12 col-md-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TeachersCreateSessions;
