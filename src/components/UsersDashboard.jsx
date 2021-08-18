import React, { useEffect, useState } from 'react';
import { testStudents } from '../test_data/test_data';
import axios from 'axios';
import CreateUserModal from './CreateUserModal';

const UsersDashboard = (props) => {
    const [students, setStudents] = useState([]);
    const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
    const [isEditModalShowing, setIsEditModalShowing] = useState(false);
    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

    const getStudents = async () => {
        // const config = {
        // }
        // const data = await axios.get(config)
    };

    const handleCreateUserModalState = () => {
        
        setIsCreateModalShowing(!isCreateModalShowing);
    };

    // const showCreateUserModal = () => {
    //     setIsCreateModalShowing(true);
    // }

    // const hideCreateUserModal = () => {
    //     setIsCreateModalShowing(false)
    // }

    useEffect(() => {
        setStudents(testStudents);
    }, []);
    return (
        <div className="component-wrapper">
            <section className="banner-bg container rounded-3 shadow py-5 my-5">
                <h1 className="banner-title text-center">Usuarios</h1>
                <div>
                    <button
                        type="button"
                        className="btn btn-success my-3  w-100"
                        onClick={setIsCreateModalShowing}
                    >
                        Agregar usuario
                    </button>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nombre completo</th>
                            <th>Nombre de usuario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.Codigo}>
                                <td>
                                    {student.Nombres} {student.Apellidos}
                                </td>
                                <td>{student.NombreUsuario}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <CreateUserModal
                    show={isCreateModalShowing}
                    onHide={handleCreateUserModalState}
                />
            </section>
        </div>
    );
};

export default UsersDashboard;
