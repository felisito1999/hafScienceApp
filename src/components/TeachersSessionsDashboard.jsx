import React, { useEffect, useState } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { IoSchool } from 'react-icons/io5';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from './Pagination';
import sessionsService from '../services/sessionsService';
import LoadingIcon from './LoadingIcon';
import MissingData from './MissingData';
import SessionDetails from './SessionDetails';
import ProtectedRoute from './ProtectedRoute';
import TeachersCreateSessions from './TeachersCreateSessions';
import UpdateSessions from './UpdateSessions';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const TeachersSessionsDashboard = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();

  //Variables de estado para controlar la información que viene de
  const [sessions, setSessions] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //Variables de estado para manejar la muestra del estado de carga de la información
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDataMissing, setIsDataMissing] = useState(false);

  //Variable para controlar el modal de confirmar la deshabilitacion de las sesiones.
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [deleteSessionId, setDeleteSessionId] = useState(null);
  //Variable de estado con un objeto que maneja los parametros de búsqueda de las sesiones.
  const [searchParameters, setSearchParameters] = useState({
    name: '',
  });

  //Función para obtener los usuarios dependiendo de los parámetros de búscqueda que se proporcionen.
  const getSessions = async (pageNumber, pageSize) => {
    setIsDataLoading(true);

    try {
      const response = await sessionsService.getPaginatedTeacherSessionsBy(
        pageNumber,
        pageSize,
        searchParameters
      );
      setSessions(response.data.records);
      setRecordsTotal(response.data.recordsTotal);

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
  const handlePageChange = (selectedPage) => {
    setSelectedPage(selectedPage);
    getSessions(selectedPage, pageSize);
  };

  const goToSessionDetail = (sessionId) => {
    history.push(`${host}prof-sesiones/${sessionId}`);
  };

  const handleNameChange = (e) => {
    setSearchParameters({
      ...searchParameters,
      name: e.target.value,
    });
  };
  
  const handleDeleteSession = async (sessionId) => {
    try {
      const result = await sessionsService.deleteSession(sessionId);
      
      getSessions(selectedPage, pageSize);
  
      handleCloseDeleteModal(); 
    } catch (error) {
      
    }
  };

  const handleOpenDeleteConfirmModal = (sessionId) => {
    console.log(sessionId);
    setDeleteSessionId(sessionId);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsConfirmDeleteModalOpen(false);
    setDeleteSessionId(null);
  };
    
  const handleSessionSearchSubmit = (e) => {
    e.preventDefault();
    getSessions(1, pageSize);
    setSelectedPage(1);
  };

  useEffect(() => {
    getSessions(selectedPage, pageSize);
  }, []);

  useEffect(() => {
    getSessions(selectedPage, pageSize);
  }, [props.location]);

  return (
    <Switch>
      <Route exact path={`${host}prof-sesiones`}>
        <>
        {isConfirmDeleteModalOpen ? (
        <ConfirmDeleteModal
          show={isConfirmDeleteModalOpen}
          onHide={handleCloseDeleteModal}
          object={'sesión'}
          sessionId={deleteSessionId}
          handleConfirmDelete={handleDeleteSession}
        />
      ) : null}
        <div className="component-wrapper">
          <section className="banner-bg container rounded-3 shadow py-3 my-5">
            <h1 className="banner-title text-center">Sesiones</h1>
            <div className="d-flex justify-content-end">
              <Link
                to={`${host}prof-sesiones/agregar`}
                className="btn me-2 p-1 btn-success rounded"
              >
                <GrAdd size={32} />
              </Link>
            </div>
            <div>
              <form onSubmit={handleSessionSearchSubmit}>
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
                  {sessions && sessions.length > 0 ? (
                    sessions.map((session) => (
                      <Col key={session.id}>
                        <Card className="bg-light h-100">
                          <div className="p-2 d-flex flex-row">
                            <div
                              className="pointer-cursor mr-2 d-flex justify-content-center align-items-center"
                              onClick={(e) => {
                                e.preventDefault();
                                goToSessionDetail(session.id);
                              }}
                            >
                              <IoSchool size={40} />
                            </div>
                            <div
                              className="pointer-cursor ms-3 d-flex flex-column flex-grow-1 justify-content-start align-items-start"
                              onClick={(e) => {
                                e.preventDefault();
                                goToSessionDetail(session.id);
                              }}
                            >
                              <p className="fw-bold">
                                {session.nombre} {session.apellidos}
                              </p>
                              <p>
                                <span className="fw-bold">Descripción: </span>
                                {session.descripcion}
                              </p>
                            </div>
                            <div>
                              <Dropdown className="bg-light">
                                <Dropdown.Toggle
                                  className="bg-light border-0 text-dark"
                                  id="session-options-dropdown"
                                  variant="light"
                                >
                                  <BsThreeDotsVertical size={25} />{' '}
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-light">
                                  <Link
                                    to={`${host}prof-sesiones/actualizar/${session.id}`}
                                    className="py-3 dropdown-item text-dark text-decoration-none"
                                  >
                                    <AiFillEdit size={20} />{' '}
                                    <span>Actualizar</span>
                                  </Link>
                                  <Dropdown.Item
                                    className="py-3 text-dark text-decoration-none"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleOpenDeleteConfirmModal(session.id)
                                    }}
                                  >
                                    <AiFillDelete size={20} />{' '}
                                    <span>Deshabilitar</span>
                                  </Dropdown.Item>
                                  {/* <Link
                                    className="py-3 dropdown-item text-dark text-decoration-none"
                                    // onClick={}
                                  ></Link> */}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <div className="w-100 p-5 text-center">
                      <h2>
                        No se encontraron sesiones administradas por usted
                      </h2>
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
          </section>
        </div>
        </>
      </Route>
    </Switch>
  );
};

export default TeachersSessionsDashboard;
