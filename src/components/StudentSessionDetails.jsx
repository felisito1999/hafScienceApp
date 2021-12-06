import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { IoSchool } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import sessionsService from '../services/sessionsService';
import Pagination from './Pagination';
import userService from '../services/usersService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import testsService from '../services/testsService';
import LoadingIcon from './LoadingIcon';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

const StudentSessionDetails = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();
  const { sessionId } = useParams();
  const [isSessionInfoLoading, setIsSessionInfoLoading] = useState(true);

  const [session, setSession] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersSelectedPage, setUsersSelectedPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(3);
  const [usersRecordsTotal, setUsersRecordsTotal] = useState(0);
  const [pruebasDiagnosticas, setPruebasDiagnosticas] = useState([]);
  const [selectedPruebasPage, setSelectedPruebasPage] = useState(1);
  const [pruebasPageSize, setPruebasPageSize] = useState(10);
  const [pruebasRecordsTotal, setPruebasRecordsTotal] = useState(0);

  const handlePageChange = (selectedPage) => {
    setUsersSelectedPage(selectedPage);
    getSessionUsers(selectedPage, usersPageSize, sessionId);
  };

  const getSessionUsers = async (selectedPage, pageSize, sessionId) => {
    try {
      const sessionUsers = await userService.getPaginatedSessionStudents(
        selectedPage,
        pageSize,
        sessionId
      );

      setUsers(sessionUsers.data.records);
      setUsersRecordsTotal(sessionUsers.data.recordsTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const getSessionsPruebasDiagnosticas = async (sessionId, page, pageSize) => {
    try {
      const result = await testsService.getBySessionId(
        page,
        pageSize,
        sessionId
      );
      console.log(result);
      setPruebasDiagnosticas(result.data.records);
      setPruebasRecordsTotal(result.data.recordsData);
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoToTest = (pruebaId, sessionId) => {
    history.push(`${host}prueba-diagnostica/${pruebaId}/${sessionId}`);
    console.log(pruebaId, sessionId);
  };

  useEffect(() => {
    const getInitData = async () => {
      const sessionData = await sessionsService.getById(sessionId);
      setSession(sessionData.data);
      getSessionUsers(usersSelectedPage, usersPageSize, sessionId);
      await getSessionsPruebasDiagnosticas(
        sessionId,
        selectedPruebasPage,
        pruebasPageSize
      );
      setIsSessionInfoLoading(false);
    };

    getInitData();
  }, []);
  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5">
        {isSessionInfoLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <div className="fw-bold d-flex justify-content-center">
              <h1 className="fw-bold text-center">
                <span>
                  <IoSchool />
                </span>{' '}
                {session && session.nombre}
              </h1>
            </div>
            <div className="d-flex justify-content-center">
              <div className="w-100">
                <Tab.Container
                  id="session-dashboard-tabs"
                  defaultActiveKey="informacion"
                >
                  <Nav
                    justify
                    className="pt-5 pb-3 justify-content-center"
                    variant="pills"
                  >
                    <Nav.Item className="tab-pills">
                      <Nav.Link
                        className="tab-pills-children"
                        eventKey="informacion"
                      >
                        Información
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="tab-pills">
                      <Nav.Link
                        className="tab-pills-children"
                        eventKey="pruebas"
                      >
                        Pruebas
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="tab-pills">
                      <Nav.Link
                        className="tab-pills-children"
                        eventKey="participantes"
                      >
                        Participantes
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content>
                    <Tab.Pane eventKey="informacion">
                      <div className="py-5 d-flex flex-column align-items-center">
                        <p className="fw-bold">Descripción</p>
                        <p>{session && session.descripcion}</p>
                        <p className="fw-bold">Centro Educativo</p>
                        <p>{session && session.nombreCentroEducativo}</p>
                        {/* Agregar la parte de la fecha de ingreso en el sistema */}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="pruebas">
                      <div className="container">
                        {pruebasDiagnosticas &&
                          pruebasDiagnosticas.map((prueba, index) => (
                            <Card
                              key={index}
                              className="pointer-cursor mb-3"
                              onClick={(e) => {
                                e.preventDefault();
                                handleGoToTest(prueba.id, sessionId);
                              }}
                            >
                              <Card.Header className="fw-bold">
                                {prueba.titulo}
                              </Card.Header>
                              <Card.Body>
                                <div>
                                  <p>
                                    <span className="fw-bold">
                                      Fecha inicio:{' '}
                                    </span>
                                    {prueba && prueba.pruebaSesion
                                      ? format(
                                          Date.parse(
                                            new Date(
                                              prueba.pruebaSesion.fechaInicio
                                            ).toUTCString()
                                          ),
                                          'PPp',
                                          {
                                            locale: es,
                                          }
                                        )
                                      : '01-01-2000'}
                                  </p>
                                  <p>
                                    <span className="fw-bold">
                                      Fecha cierre:{' '}
                                    </span>
                                    {prueba && prueba.pruebaSesion
                                      ? format(
                                          Date.parse(
                                            prueba.pruebaSesion.fechaLimite
                                          ),
                                          'PPp',
                                          {
                                            locale: es,
                                          }
                                        )
                                      : '01-01-2000'}
                                  </p>
                                  <p>
                                    <span className="fw-bold">Tiempo: </span>
                                    {prueba.pruebaSesion.duracionMinutos}{' '}
                                    minutos
                                  </p>
                                </div>
                              </Card.Body>
                              <Card.Footer className="d-flex">
                                {prueba &&
                                prueba.usuarioRealizaPrueba &&
                                prueba.usuarioRealizaPrueba
                                  .intentoCompletado ? (
                                  <div>
                                    <span className="fw-bold">
                                      Calificación:
                                    </span>{' '}
                                    {prueba &&
                                      prueba.usuarioRealizaPrueba &&
                                      prueba.usuarioRealizaPrueba.calificacion}
                                  </div>
                                ) : (
                                  <p className="fw-bold">Esta prueba no ha sido realizada</p>
                                )}
                              </Card.Footer>
                            </Card>
                          ))}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="participantes">
                      <Row xs={1} className="g-2 pb-2">
                        {users && users.length > 0 ? (
                          users.map((user) => (
                            <Col key={user.codigo}>
                              <Card
                                className="pointer-cursor bg-light h-100"
                                onClick={(e) => {
                                  //history.push(`${host}prof-sesiones/${session.id}`)
                                }}
                              >
                                <div className="p-2 d-flex flex-row">
                                  <div className="mr-2 d-flex justify-content-center align-items-center">
                                    <FaUser size={40} />
                                  </div>
                                  <div className="ms-3 d-flex flex-column justify-content-start align-items-start">
                                    <p className="fw-bold">
                                      Matrícula:{' '}
                                      <span className="fw-lighter">
                                        {user.codigo}
                                      </span>
                                    </p>
                                    <p>
                                      {user.nombres} {user.apellidos}
                                    </p>
                                  </div>
                                </div>
                              </Card>
                            </Col>
                          ))
                        ) : (
                          <div className="w-100 p-5 text-center">
                            <h2>Esta sesión no tiene estudiantes asignados.</h2>
                          </div>
                        )}
                      </Row>
                      <p className="fw-bold">
                        Cantidad total de estudiantes:{' '}
                        <span className="fw-bolder">{usersRecordsTotal}</span>
                      </p>
                      <Pagination
                        actualPage={usersSelectedPage}
                        recordsTotal={usersRecordsTotal}
                        pageSize={usersPageSize}
                        handlePageChange={handlePageChange}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default StudentSessionDetails;
