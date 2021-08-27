import React, { useEffect, useState } from 'react';
import { testUsers } from '../test_data/test_data';
import axios from 'axios';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const UsersDashboard = (props) => {
    const [users, setUsers] = useState([]);
    const [isFilteringData, setIsFilteringData] = useState(true);

    const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);

    const [isEditModalShowing, setIsEditModalShowing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

    const getUsers = async () => {

        const config = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}usuarios`,
            headers: {

            },
            data: null
        }

        try {
            const response = await axios(config);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
            alert("No se han podido mostrar los usuarios solicitados, intente de nuevo");
        }

    };

    const getFilteredData = async (filteredValues) => {
        const config = {
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}usuarios`,
            params: {

            },
            headers: {

            },
            data: null
        }

        try {
            const response = await axios(config);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
            alert("No se han podido mostrar los usuarios solicitados, intente de nuevo");
        }
    }

    const handleEditModalSelection = () => {
        
    }

    const handleCreateUserModalState = () => {
        setIsCreateModalShowing(!isCreateModalShowing);
        getUsers();
    };

    const handleEditUserModalState = (id) => {
        setIsEditModalShowing(!isEditModalShowing);
        getUsers();
    }
    const handleDeleteUserModalState = () => {
        setIsDeleteModalShowing(!isDeleteModalShowing);
        getUsers();
    }
    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {

    },[])
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
                            <th>Correo electronico</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.usuarioId}>
                                <td>
                                    {user && user.usuarioDetalle && user.usuarioDetalle.nombres} {user && user.usuarioDetalle && user.usuarioDetalle.apellidos}
                                </td>
                                <td>{user.nombreUsuario}</td>
                                <td>{user && user.usuarioDetalle && user.usuarioDetalle.correoElectronico}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                <CreateUserModal
                    show={isCreateModalShowing}
                    onHide={handleCreateUserModalState}
                    dataUpdate={getUsers}
                />
                <EditUserModal
                    show={isEditModalShowing}
                    onHide={handleEditUserModalState}
                    dataUpdate={getUsers}
                    UserId={}
                />
                <DeleteUserModal
                    show={isDeleteModalShowing}
                    onHide={handleDeleteModalState}
                    dataUpdate={}
                />
            </section>
        </div>
    );
};

export default UsersDashboard;
