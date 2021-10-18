import React, { useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import { GrAdd } from 'react-icons/gr'
import UserDetailsModal from './UserDetailsModal';
import Pagination from './Pagination';
import Collapse from 'react-bootstrap/Collapse';
import { ReactComponent as FilterIcon } from '../images/filtro.svg';
import Card from 'react-bootstrap/Card';
import { FaUser } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectAsync from './SelectAsync';
import userService from '../services/usersService';
import sessionsService from '../services/sessionsService'
import LoadingIcon from './LoadingIcon';
import MissingData from './MissingData';

const TeachersSessionsDashboard = (props) => {
    //Variables de estado para controlar la información que viene de
    const [sessions, setSessions] = useState([]);
    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [selectedPage, setSelectedPage] = useState(1);
    const [recordsTotal, setRecordsTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    //Variables de estado para manejar la muestra del estado de carga de la información
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isDataMissing, setIsDataMissing] = useState(false);

    //Variable de estado con un objeto que maneja los parametros de búsqueda de las sesiones.
    const [searchParameters, setSearchParameters] = useState({
        name: ''
    });

    //Variables de estado para manejar los modales de crud.
    const [isSessionDetailsModalShowing, setIsUserSessionDetailsModalShowing] =
        useState(false);
    const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
    const [isFilterCollapseOpen, setIsFilterCollapseOpen] = useState(false);

    //Función para obtener los usuarios dependiendo de los parámetros de búscqueda que se proporcionen.
    const getSessions = async (pageNumber, pageSize) => {
        setIsDataLoading(true);

        try {
            const response = await sessionsService.getPaginatedTeacherSessionsBy(
                pageNumber,
                pageSize,
                searchParameters
            );
            setSessions(response.records);
            setRecordsTotal(response.recordsTotal);
            setIsDataLoading(false);
            if (isDataMissing) {
                setIsDataMissing(false);
            }
        } catch (error) {
            setIsDataLoading(false);
            setIsDataMissing(true);
        }
    };

    //Declaración de las funciones para el menejo de las variables de estado.
    const OpenUserDetailsModal = (userId) => {
        setSelectedSessionId(userId);
        setIsUserSessionDetailsModalShowing(true);
    };
    const closeUserDetailsModal = () => {
        setIsUserSessionDetailsModalShowing(false);
        getSessions(selectedPage, pageSize);
    };

    const openCreateUserModal = () => {
        setIsCreateModalShowing(true);
    };
    const closeCreateUserModal = () => {
        setIsCreateModalShowing(false);
        getSessions(selectedPage, pageSize);
    };

    const handlePageChange = (selectedPage) => {
        setSelectedPage(selectedPage);
        getSessions(selectedPage, pageSize);
    };

    const handleFilterOpen = (e) => {
        e.preventDefault();

        setIsFilterCollapseOpen(!isFilterCollapseOpen);
    };

    const handleSchoolsChange = (value) => {
        setSearchParameters({
            ...searchParameters,
            centroEducativoId: value.id,
        });
    };

    const handleNameChange = (e) => {
        setSearchParameters({
            ...searchParameters,
            name: e.target.value,
        });
    };

    const handleRolesChange = (e) => {
        setSearchParameters({
            ...searchParameters,
            rolId: e.target.value === '' ? null : e.target.value,
        });
    };

    const handleUserSearchSubmit = (e) => {
        e.preventDefault();
        getSessions(1, pageSize);
        setSelectedPage(1);
    };

    useEffect(() => {
        getSessions(selectedPage, pageSize);
    }, []);

    return (
        <div className="component-wrapper">
            <section className="banner-bg container rounded-3 shadow py-3 my-5">
                <h1 className="banner-title text-center">Sesiones</h1>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn me-2 p-1 btn-success rounded"
                        onClick={openCreateUserModal}
                    >
                        <GrAdd size={32} />
                    </button>
                </div>
                <div>
                    <form onSubmit={handleUserSearchSubmit}>
                        <div className="d-flex">
                            <div className="py-2 pr-2 flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="form-control"
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="p-2">
                                <button className="btn btn-success">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {isDataLoading ? (
                    <LoadingIcon />
                ) : isDataMissing ? (
                    <MissingData />
                ) : (
                    <>
                        <Row xs={1} md={2} className="g-2 pb-2">
                            {sessions.length > 0 ? (
                                sessions.map((user) => (
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
                                                        {
                                                            user.nombreCentroEducativo
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <div className="w-100 p-5 d-flex flex-row align-items-center justify-content-center">
                                    <h2>No se encontraron usuarios</h2>
                                </div>
                            )}
                        </Row>
                        <Pagination
                            actualPage={selectedPage}
                            recordsTotal={recordsTotal}
                            pageSize={pageSize}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )}
                {isSessionDetailsModalShowing ? (
                    <UserDetailsModal
                        show={isSessionDetailsModalShowing}
                        onHide={closeUserDetailsModal}
                        userId={selectedSessionId}
                    />
                ) : null}
                {isCreateModalShowing ? (
                    <CreateUserModal
                        show={isCreateModalShowing}
                        onHide={closeCreateUserModal}
                        dataupdate={getSessions}
                    />
                ) : null}
            </section>
        </div>
    );
}

export default TeachersSessionsDashboard;