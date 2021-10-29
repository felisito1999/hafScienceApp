import React, { useEffect, useState } from 'react';
import CreateUserModal from './CreateUserModal';
import { AiOutlineUserAdd } from 'react-icons/ai';
import UserDetailsModal from './UserDetailsModal';
import Pagination from './Pagination';
import Collapse from 'react-bootstrap/Collapse';
import { ReactComponent as FilterIcon } from '../images/filtro.svg';
import Card from 'react-bootstrap/Card';
import { FaUser } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SelectAsync from './SchoolsSearchSelectAsync';
import userService from '../services/usersService';
import LoadingIcon from './LoadingIcon';
import MissingData from './MissingData';

const UsersDashboard = (props) => {
  //Variables de estado para controlar la información que viene de
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedPage, setSelectedPage] = useState(1);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //Variables de estado para manejar la muestra del estado de carga de la información
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDataMissing, setIsDataMissing] = useState(false);

  //Variable de estado con un objeto que maneja los parametros de búsqueda de los usuarios.
  const [searchParameters, setSearchParameters] = useState({
    name: '',
    username: '',
    correoElectronico: '',
    centroEducativoId: null,
    rolId: null,
  });

  //Variables de estado para manejar los modales de crud.
  const [isUserDetailsModalShowing, setIsUserDetailsModalShowing] =
    useState(false);
  const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);
  const [isFilterCollapseOpen, setIsFilterCollapseOpen] = useState(false);

  //Función para obtener los usuarios dependiendo de los parámetros de búscqueda que se proporcionen.
  const getUsers = async (pageNumber, pageSize) => {
    setIsDataLoading(true);

    try {
      const response = await userService.getAllPaginatedUsersBy(
        pageNumber,
        pageSize,
        searchParameters
      );
      setUsers(response.records);
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
    setSelectedUserId(userId);
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

  const handlePageChange = (selectedPage) => {
    setSelectedPage(selectedPage);
    getUsers(selectedPage, pageSize);
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
    getUsers(1, pageSize);
    setSelectedPage(1);
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
            className="btn me-2 p-1 btn-success rounded"
            onClick={openCreateUserModal}
          >
            {/* <AgregarUsuario 
                        height={20}
                        width={20}/> */}
            <AiOutlineUserAdd size={32} />
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
                <button className="btn btn-success">Buscar</button>
              </div>
              <div className="p-2">
                <FilterIcon
                  className={
                    isFilterCollapseOpen
                      ? 'p-2 rounded pointer-cursor bg-success'
                      : 'p-2 pointer-cursor'
                  }
                  height={38}
                  width={42}
                  onClick={handleFilterOpen}
                  aria-controls="user-filters-options-collapse"
                  aria-expanded={isFilterCollapseOpen}
                />
              </div>
            </div>
          </form>
          <Collapse in={isFilterCollapseOpen}>
            <div
              className="p-2 mb-2 bg-light"
              id="user-filters-options-collapse"
            >
              <div className="d-flex flex-column flex-lg-row">
                <div className="p-1 d-flex flex-column align-items-start flex-sm-row align-items-sm-center ">
                  <div>Roles:</div>
                  <div className="p-1">
                    <input
                      type="radio"
                      className="btn-check"
                      name="role-options"
                      id="btn-radio-role-todos"
                      defaultChecked
                      autoComplete="off"
                      value={''}
                      onChange={handleRolesChange}
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
                      id="btn-radio-role-docente"
                      autoComplete="off"
                      value={2}
                      onChange={handleRolesChange}
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
                      value={3}
                      onChange={handleRolesChange}
                    />
                    <label
                      className="p-1 btn btn-outline-success"
                      htmlFor="btn-radio-role-estudiante"
                    >
                      Estudiante
                    </label>
                  </div>
                </div>
                <div className="p-1 d-flex flex-fill flex-column align-items-start flex-sm-row align-items-sm-center ">
                  <div>Centros Educativos:</div>
                  <div className="ms-2 w-90 flex-fill flex-grow-1">
                    <SelectAsync handleSchoolChange={handleSchoolsChange} />
                  </div>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
        {isDataLoading ? (
          <LoadingIcon />
        ) : isDataMissing ? (
          <MissingData />
        ) : (
          <>
            <Row xs={1} md={2} className="g-2 pb-2">
              {users.length > 0 ? (
                users.map((user) => (
                  <Col key={user.id}>
                    <Card
                      className="pointer-cursor bg-light h-100"
                      onClick={(e) => OpenUserDetailsModal(user.id)}
                    >
                      <div className="p-2 d-flex flex-row">
                        <div className="mr-2 d-flex justify-content-center align-items-center">
                          <FaUser size="50" />
                        </div>
                        <div className="ms-3 d-flex flex-column justify-content-start align-items-start">
                          <p className="fw-bold">
                            {user.nombres} {user.apellidos}
                          </p>
                          <p>
                            <span className="fw-bold">Nombre de usuario: </span>
                            {user.nombreUsuario}
                          </p>
                          <p>
                            <span className="fw-bold">Centro educativo: </span>
                            {user.nombreCentroEducativo}
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
        {isUserDetailsModalShowing ? (
          <UserDetailsModal
            show={isUserDetailsModalShowing}
            onHide={closeUserDetailsModal}
            userId={selectedUserId}
          />
        ) : null}
        {isCreateModalShowing ? (
          <CreateUserModal
            show={isCreateModalShowing}
            onHide={closeCreateUserModal}
            dataupdate={getUsers}
          />
        ) : null}
      </section>
    </div>
  );
};

export default UsersDashboard;
