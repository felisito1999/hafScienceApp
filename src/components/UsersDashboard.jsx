import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import axios from 'axios';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
// import { IoAddOutline } from 'react-icons/io5';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { ReactComponent as AgregarUsuario } from '../images/agregarUsuario.svg';
import UserDetailsModal from './UserDetailsModal';
import Pagination from './Pagination';
import Collapse from 'react-bootstrap/Collapse'

const UsersDashboard = (props) => {
    //variables for handling incoming data
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPage, setSelectedPage] = useState(1);
    const [recordsTotal, setRecordsTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    //const [isFilteringData, setIsFilteringData] = useState(true);

    //varibales for user feedback on data loading
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isDataMissing, setIsDataMissing] = useState(false);

    //search parameters variables
    const [usernameSearchValue, setUsernameSearchValue] = useState(null);
    const [schoolSearchValue, setSchoolSearchValue] = useState(null);
    const [userRoleValue, setUserRoleValue] = useState(null);

    //variables for showing crud related modals and collapse
    const [isUserDetailsModalShowing, setIsUserDetailsModalShowing] =
        useState(false);
    const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
    const [isEditModalShowing, setIsEditModalShowing] = useState(false);
    const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);
    const [isFilterCollapseOpen, setIsFilterCollapseOpen] = useState(false);

    const getUsers = async (pageNumber, pageSize) => {
        setIsDataLoading(true);
        const source = axios.CancelToken.source();

        const timeout = setTimeout(() => {
            source.cancel();
            throw 'Ha pasado el tiempo máximo de respuesta';
        }, 5000);

        const config = {
            method: 'get',
            cancelToken: source.token,
            url: `${process.env.REACT_APP_API_URL}usuarios`,
            params: {
                page: pageNumber,
                pageSize: pageSize,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            data: null,
        };

        try {
            const response = await axios(config);
            clearTimeout(timeout);
            setUsers(response.data.records);
            setRecordsTotal(response.data.recordsTotal);
            setIsDataLoading(false);
        } catch (error) {
            clearTimeout(timeout);
            setIsDataLoading(false);
            setIsDataMissing(true);
        }
    };

    const OpenUserDetailsModal = (e, userId) => {
        e.preventDefault();
        setSelectedUser(users.find((user) => user.id === userId));
        setIsUserDetailsModalShowing(true);
    };
    const closeUserDetailsModal = () => {
        setIsUserDetailsModalShowing(false);
        getUsers(selectedPage, pageSize);
    };

    const openCreateUserModal = () => {
        setIsCreateModalShowing(true);
    };
    const closeCreateUserModal = () => {
        setIsCreateModalShowing(false);
        getUsers(selectedPage, pageSize);
    };

    const openEditModalSelection = () => {
        setIsEditModalShowing(true);
    };
    const closeEditUserModal = (id) => {
        setIsEditModalShowing(false);
        getUsers(selectedPage, pageSize);
    };

    const openDeleteUserModal = () => {
        setIsDeleteModalShowing(true);
        getUsers(selectedPage, pageSize);
    };
    const closeDeleteUserModal = () => {
        setIsDeleteModalShowing(false);
        getUsers(selectedPage);
    };

    const handlePageChange = (selectedPage) => {
        setSelectedPage(selectedPage);
        getUsers(selectedPage, pageSize);
        console.log(selectedPage);
    };

    const handleFilterOpen = (e) => {
        e.preventDefault();

        setIsFilterCollapseOpen(!isFilterCollapseOpen);
    };

    useEffect(() => {
        getUsers(selectedPage, pageSize);
    }, []);

    return (
        <div className="component-wrapper">
            <section className="banner-bg container rounded-3 shadow py-5 my-5">
                <h1 className="banner-title text-center">Usuarios</h1>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn"
                        onClick={setIsCreateModalShowing}
                    >
                        {/* <AgregarUsuario 
                        height={20}
                        width={20}/> */}
                        <AiOutlineUserAdd size={35} />
                    </button>
                </div>
                <div>
                    <form>
                        <div className="row g-3">
                            <div className="col">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="form-control"
                                />
                            </div>
                            <div className="col">
                                <button className="btn btn-success">
                                    Buscar
                                </button>
                            </div>
                            <div className="col">
                                <button
                                    className="btn btn-light dropdown-toggle"
                                    onClick={handleFilterOpen}
                                    aria-controls="user-filters-options-collapse"
                                    aria-expanded={isFilterCollapseOpen}
                                >
                                    Filtros
                                </button>
                            </div>
                        </div>
                    </form>
                    <Collapse in={isFilterCollapseOpen}>
                        <div id="user-filters-options-collapse">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. Nihil
                            anim keffiyeh helvetica, craft beer labore wes
                            anderson cred nesciunt sapiente ea proident.
                        </div>
                    </Collapse>
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
                    <>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Usuario</th>
                                    <th>Centro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        onClick={(e) =>
                                            OpenUserDetailsModal(e, user.id)
                                        }
                                    >
                                        <td>
                                            {user && user.nombres}{' '}
                                            {user && user.apellidos}
                                        </td>
                                        <td>{user.nombreUsuario}</td>
                                        <td>
                                            {user && user.nombreCentroEducativo}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                        <Pagination
                            actualPage={selectedPage}
                            recordsTotal={recordsTotal}
                            pageSize={pageSize}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )}
                {isUserDetailsModalShowing ? (
                    <UserDetailsModal
                        show={isUserDetailsModalShowing}
                        onHide={closeUserDetailsModal}
                        userData={selectedUser}
                    />
                ) : null}
                {isCreateModalShowing ? (
                    <CreateUserModal
                        show={isCreateModalShowing}
                        onHide={closeCreateUserModal}
                        dataupdate={getUsers}
                    />
                ) : null}
                {isEditModalShowing ? (
                    <EditUserModal
                        show={isEditModalShowing}
                        onHide={closeUserDetailsModal}
                        dataupdate={getUsers}
                        UserId={selectedUser}
                    />
                ) : null}
                {isDeleteModalShowing ? (
                    <DeleteUserModal
                        show={isDeleteModalShowing}
                        onHide={closeDeleteUserModal}
                        userId={selectedUser}
                    />
                ) : null}
            </section>
        </div>
    );
};

export default UsersDashboard;
