import React, { useEffect, useState } from 'react';
import sessionsService from '../services/sessionsService';
import userService from '../services/usersService';

const AddSessionsUsers = (props) => {
    const [schoolUsers, setSchoolUsers] = useState([]);
    const [userNameParameter, setUserNameParameter] = useState('');
    const [session, setSession] = useState({
        nombre: '',
        descripcion: '',
        centroEducativoId: 0,
    });

    const [teacherStudents, setTeacherStudents] = useState([]);

    const handleSessionSubmit = async (session) => {
        const response = await sessionsService.saveSession(session);
        console.log(response);
    };

    const handleNombreChange = (e) => {
        setSession({
            ...session,
            nombre: e.target.value,
        });
    };

    const handleDescripcionChange = (e) => {
        setSession({
            ...session,
            descripcion: e.target.value,
        });
    };

    const handleUserNameSearch = (e) => {
        setUserNameParameter(e.target.value);
    };

    useEffect(() => {
        const getSchoolStudents = async () => {
            const students = await userService.getAllPaginatedUsersBy();
        };
    });

    return (
        <div className="component-wrapper banner-bg">
            <section className="banner-bg container rounded-3 shadow py-3 my-5">
                <h1 className="banner-title text-center">Sesiones</h1>
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
                        <label htmlFor="direccion" className="form-label mb-4">
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
        </div>
    );
};

export default AddSessionsUsers;
