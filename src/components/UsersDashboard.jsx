import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { axios, CancelToken } from 'axios';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const UsersDashboard = (props) => {
    const [users, setUsers] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isDataMissing, setIsDataMissing] = useState(false);
    const [isFilteringData, setIsFilteringData] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
    const [isEditModalShowing, setIsEditModalShowing] = useState(false);
    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

    const getUsers = async () => {
        const source = CancelToken.source();
        console.log(source);
        const timeout = setTimeout(() => {
            source.cancel();
            throw 'Ha pasado el tiempo máximo de respuesta';
        }, 5000);

        const config = {
            method: 'get',
            cancelToken: source.token,
            url: `${process.env.REACT_APP_API_URL}usuarios`,
            headers: {},
            data: null,
        };

        try {
            const response = await axios(config);
            clearTimeout(timeout);
            setUsers(response.data);
            setIsDataLoading(false);
        } catch (error) {
            setIsDataLoading(false);
            setIsDataMissing(true);
            console.log(error);
            // alert(
            //     'No se han podido mostrar los usuarios solicitados, intente de nuevo'
            // );
        }

        // axios(config)
        // .then((response) => {
        //     setUsers(response.data);
        //     setIsDataLoading(false);
        // })
        // .catch((error) => {
        //     setIsDataLoading(false);
        //     console.log(error);
        //     alert('No se han podido mostrar los usuarios solicitados, intente de nuevo');
        // })
    };

    const getFilteredData = async (filteredValues) => {
        try {
            const source = CancelToken.source();
            console.log(source);
            const timeout = setTimeout(() => {
                source.cancel();
                throw 'Ha pasado el tiempo máximo de respuesta';
            }, 10000);

            const config = {
                method: 'get',
                cancelToken: source.token,
                url: `${process.env.REACT_APP_API_URL}usuarios`,
                params: {},
                headers: {},
                data: null,
            };

            const response = await axios(config);
            clearTimeout(timeout);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
            // alert(
            //     'No se han podido mostrar los usuarios solicitados, intente de nuevo'
            // );
        }
    };

    const handleEditModalSelection = () => {};

    const handleCreateUserModalState = () => {
        setIsCreateModalShowing(!isCreateModalShowing);
        getUsers();
    };

    const handleEditUserModalState = (id) => {
        setIsEditModalShowing(!isEditModalShowing);
        getUsers();
    };
    const handleDeleteUserModalState = () => {
        setIsDeleteModalShowing(!isDeleteModalShowing);
        getUsers();
    };
    useEffect(() => {
        getUsers();
    }, [users]);

    useEffect(() => {}, []);
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
                {isDataLoading ? (
                    <div className="d-flex justify-content-center mt-3">
                        <AiOutlineLoading3Quarters
                            size={50}
                            className="rotating-icon"
                        />
                    </div>
                ) : isDataMissing ? (
                    <div className="d-flex justify-content-center mt-3">
                        <h3>Ha ocurrido un error, intente de nuevo</h3>
                    </div>
                ) : (
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
                                        {user &&
                                            user.usuarioDetalle &&
                                            user.usuarioDetalle.nombres}{' '}
                                        {user &&
                                            user.usuarioDetalle &&
                                            user.usuarioDetalle.apellidos}
                                    </td>
                                    <td>{user.nombreUsuario}</td>
                                    <td>
                                        {user &&
                                            user.usuarioDetalle &&
                                            user.usuarioDetalle
                                                .correoElectronico}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                )}
                {isCreateModalShowing ? (
                    <CreateUserModal
                        show={isCreateModalShowing}
                        onHide={handleCreateUserModalState}
                        dataupdate={getUsers}
                    />
                ) : null}
                {isEditModalShowing ? (
                    <EditUserModal
                        show={isEditModalShowing}
                        onHide={handleEditUserModalState}
                        dataupdate={getUsers}
                        UserId={selectedUser}
                    />
                ) : null}
                {isDeleteModalShowing ? (
                    <DeleteUserModal
                        show={isDeleteModalShowing}
                        onHide={handleDeleteUserModalState}
                        userId={selectedUser}
                    />
                ) : null}
            </section>
        </div>
    );
};

export default UsersDashboard;
