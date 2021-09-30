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
import Collapse from 'react-bootstrap/Collapse';
import { ReactComponent as FilterIcon } from '../images/filtro.svg';
import Card from 'react-bootstrap/Card';
import { FaUser } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AsyncSelect from 'react-select/async'

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

    const OpenUserDetailsModal = (userId) => {
        setSelectedUser(users.find((user) => user.id === userId));
        setIsUserDetailsModalShowing(true);
    };
    const closeUserDetailsModal = (isSuccess) => {
        setIsUserDetailsModalShowing(false);

        if (isSuccess) {
            getUsers(selectedPage, pageSize);
        }
    };

    const openCreateUserModal = () => {
        setIsCreateModalShowing(true);
    };
    const closeCreateUserModal = (isSuccess) => {
        setIsCreateModalShowing(false);

        if (isSuccess) {
            getUsers(selectedPage, pageSize);
        }
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
            <section className="banner-bg container rounded-3 shadow py-3 my-5">
                <h1 className="banner-title text-center">Usuarios</h1>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn me-1 p-1 btn-success rounded-circle"
                        onClick={openCreateUserModal}
                    >
                        {/* <AgregarUsuario 
                        height={20}
                        width={20}/> */}
                        <AiOutlineUserAdd size={35} />
                    </button>
                </div>
                <div>
                    <form>
                        <div className="d-flex">
                            <div className="py-2 pr-2 flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="form-control"
                                />
                            </div>
                            <div className="p-2">
                                <button className="btn btn-success">
                                    Buscar
                                </button>
                            </div>
                            <div className="p-2">
                                {/* <button
                                    className="btn btn-light dropdown-toggle"
                                    onClick={handleFilterOpen}
                                    aria-controls="user-filters-options-collapse"
                                    aria-expanded={isFilterCollapseOpen}
                                >
                                    Filtros
                                </button> */}
                                <FilterIcon
                                    className={
                                        isFilterCollapseOpen
                                            ? 'p-2 rounded-circle pointer-cursor bg-success'
                                            : 'p-2 pointer-cursor'
                                    }
                                    height={40}
                                    width={40}
                                    onClick={handleFilterOpen}
                                    aria-controls="user-filters-options-collapse"
                                    aria-expanded={isFilterCollapseOpen}
                                />
                            </div>
                        </div>
                    </form>
                    <Collapse in={isFilterCollapseOpen}>
                        <div
                            className="p-2 mb-2 banner-bg"
                            id="user-filters-options-collapse"
                        >
                            {/* <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                />
                                <label
                                    class="form-check-label"
                                    for="flexRadioDefault1"
                                >
                                    Default radio
                                </label>
                            </div>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    checked
                                />
                                <label
                                    class="form-check-label"
                                    for="flexRadioDefault2"
                                >
                                    Default checked radio
                                </label>
                            </div> */}
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="p-1 d-flex flex-column align-items-start flex-sm-row align-items-sm-center bg-light">
                                    <div>Roles:</div>
                                    <div className="p-1">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="role-options"
                                            id="btn-radio-role-todos"
                                            defaultChecked
                                            autoComplete="off"
                                        />
                                        <label
                                            className="p-1 btn btn-outline-success"
                                            htmlFor="btn-radio-role-todos"
                                        >
                                            Todos
                                        </label>
                                    </div>
                                    <div className="p-1">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="role-options"
                                            id="btn-radio-role-administrador"
                                            autoComplete="off"
                                        />
                                        <label
                                            className="p-1 btn btn-outline-success"
                                            htmlFor="btn-radio-role-administrador"
                                        >
                                            Administrador
                                        </label>
                                    </div>
                                    <div className="p-1">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="role-options"
                                            id="btn-radio-role-docente"
                                            autoComplete="off"
                                        />
                                        <label
                                            className="p-1 btn btn-outline-success"
                                            htmlFor="btn-radio-role-docente"
                                        >
                                            Docente
                                        </label>
                                    </div>
                                    <div className="p-1">
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="role-options"
                                            id="btn-radio-role-estudiante"
                                            autoComplete="off"
                                        />
                                        <label
                                            className="p-1 btn btn-outline-success"
                                            htmlFor="btn-radio-role-estudiante"
                                        >
                                            Estudiante
                                        </label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div>Centros Educativos:</div>
                                    
                                </div>
                            </div>
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
                        {/* <table className="table table-responsive table-hover">
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
                        </table> */}
                        <Row xs={1} md={2} className="g-2 pb-2">
                            {users.map((user) => (
                                <Col key={user.id}>
                                    <Card
                                        className="pointer-cursor bg-light h-100"
                                        onClick={(e) =>
                                            OpenUserDetailsModal(user.id)
                                        }
                                    >
                                        <div className="p-2 d-flex flex-row">
                                            <div className="mr-2 d-flex justify-content-center align-items-center">
                                                <FaUser size="50" />
                                            </div>
                                            <div className="ms-3 d-flex flex-column justify-content-start align-items-start">
                                                <p className="fw-bold">
                                                    {user.nombres}{' '}
                                                    {user.apellidos}
                                                </p>
                                                <p>
                                                    <span className="fw-bold">
                                                        Nombre de usuario:{' '}
                                                    </span>
                                                    {user.nombreUsuario}
                                                </p>
                                                <p>
                                                    <span className="fw-bold">
                                                        Centro educativo:{' '}
                                                    </span>
                                                    {user.nombreCentroEducativo}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
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
