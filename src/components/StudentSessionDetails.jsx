import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { IoSchool } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { BiHappyBeaming, BiSad } from 'react-icons/bi';
import { GiSurprised } from 'react-icons/gi';
import { AiFillWarning } from 'react-icons/ai';
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
import StartTestAttemptConfirmationModal from './StartTestAttemptConfirmationModal';
import badgesService from '../services/badgesService';

const StudentSessionDetails = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();
  const { sessionId } = useParams();
  const [isSessionInfoLoading, setIsSessionInfoLoading] = useState(true);

  const [session, setSession] = useState(null);
  const [sessionBadges, setSessionBadges] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersSelectedPage, setUsersSelectedPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(3);
  const [usersRecordsTotal, setUsersRecordsTotal] = useState(0);
  const [pruebasDiagnosticas, setPruebasDiagnosticas] = useState([]);
  const [selectedPruebasPage, setSelectedPruebasPage] = useState(1);
  const [pruebasPageSize, setPruebasPageSize] = useState(5);
  const [pruebasRecordsTotal, setPruebasRecordsTotal] = useState(0);
  const [arePruebasLoading, setArePruebasLoading] = useState(true);
  const [isTestConfirmationModalOpen, setIsTestConfirmationModalOpen] =
    useState(false);
  const [selectedTestId, setSelectedTestId] = useState(null);
  const handlePageChange = (selectedPage) => {
    setUsersSelectedPage(selectedPage);
    getSessionUsers(selectedPage, usersPageSize, sessionId);
  };

  const handlePruebasPageChange = async (selectedPage) => {
    setSelectedPruebasPage(selectedPage);
    await getSessionsPruebasDiagnosticas(
      sessionId,
      selectedPage,
      pruebasPageSize
    );
  };

  const getSessionUsers = async (selectedPage, pageSize, sessionId) => {
    try {
      const response = await userService.getPaginatedSessionStudents(
        selectedPage,
        pageSize,
        sessionId
      );

      if (response) {
        setUsers(response.data.records);
        setUsersRecordsTotal(response.data.recordsTotal);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSessionsPruebasDiagnosticas = async (sessionId, page, pageSize) => {
    setArePruebasLoading(true);
    try {
      const response = await testsService.getBySessionId(
        page,
        pageSize,
        sessionId
      );

      if (response) {
        console.log(response.data);
        setPruebasDiagnosticas(response.data.records);
        setPruebasRecordsTotal(response.data.recordsTotal);
      }
    } catch (error) {
      console.log(error);
    }
    setArePruebasLoading(false);
  };
  const handleTestConfirmationModalShow = () => {
    setIsTestConfirmationModalOpen(!isTestConfirmationModalOpen);
  };

  const handleOpenTestConfirmationModal = (pruebaId, sessionId) => {};

  const handleTestConfirmationModalResult = (isSure, pruebaId, sessionId) => {
    if (isSure) {
      handleGoToTest(pruebaId, sessionId);
    } else {
      handleTestConfirmationModalShow();
    }
  };
  const handleGoToTest = (pruebaId, sessionId) => {
    history.push(`${host}prueba-diagnostica/${pruebaId}/${sessionId}`);
    console.log(pruebaId, sessionId);
  };

  const getMyBadges = async () => {
    try {
      const result = await badgesService.getStudentBadges(sessionId);

      if (result) { 
        console.log(result);
        setSessionBadges(result.data)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const getInitData = async () => {
      const sessionData = await sessionsService.getById(sessionId);

      if (sessionData) {
        setSession(sessionData.data);
        getSessionUsers(usersSelectedPage, usersPageSize, sessionId);
        await getSessionsPruebasDiagnosticas(
          sessionId,
          selectedPruebasPage,
          pruebasPageSize
        );
      }
      getMyBadges();
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
            {isTestConfirmationModalOpen ? (
              <StartTestAttemptConfirmationModal
                show={isTestConfirmationModalOpen}
                onHide={handleOpenTestConfirmationModal}
                testId={selectedTestId}
                sessionId={parseInt(sessionId)}
                handleModalResult={handleTestConfirmationModalResult}
              />
            ) : null}
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
                    <Nav.Item className="tab-pills">
                      <Nav.Link
                        className="tab-pills-children"
                        eventKey="insignias"
                      >
                        Insignias
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
                        {arePruebasLoading ? (
                          <LoadingIcon />
                        ) : (
                          <>
                            {pruebasDiagnosticas &&
                            pruebasDiagnosticas.length > 0 ? (
                              <>
                                {pruebasDiagnosticas &&
                                  pruebasDiagnosticas.map((prueba, index) => (
                                    <Card
                                      key={index}
                                      className={`border rounded pointer-cursor mb-3 ${
                                        prueba.usuarioRealizaPrueba &&
                                        prueba.usuarioRealizaPrueba
                                          .intentoCompletado
                                          ? prueba.usuarioRealizaPrueba
                                              .porcentaje >= 90
                                            ? 'border-success'
                                            : prueba.usuarioRealizaPrueba
                                                .porcentaje >= 70
                                            ? 'border-warning border-2'
                                            : 'border-danger border-2'
                                          : null
                                      }`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedTestId(prueba.id);
                                        handleTestConfirmationModalShow();
                                      }}
                                    >
                                      <Card.Header
                                        className={`d-flex border justify-content-center fw-bold ${
                                          prueba.usuarioRealizaPrueba &&
                                          prueba.usuarioRealizaPrueba
                                            .intentoCompletado
                                            ? prueba.usuarioRealizaPrueba
                                                .porcentaje >= 90
                                              ? 'bg-success border-success'
                                              : prueba.usuarioRealizaPrueba
                                                  .porcentaje >= 70
                                              ? 'bg-warning border-warning border-2'
                                              : 'bg-danger border-danger border-2'
                                            : null
                                        }`}
                                      >
                                        <div className="flex-grow-1">
                                          {prueba.titulo}
                                        </div>
                                        {prueba &&
                                        prueba.usuarioRealizaPrueba == null ? (
                                          <span className="text-warning">
                                            <AiFillWarning size={25} />
                                          </span>
                                        ) : prueba.usuarioRealizaPrueba
                                            .intentoCompletado ? null : (
                                          <span className="text-warning">
                                            <AiFillWarning size={25} />
                                          </span>
                                        )}
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
                                                    prueba.pruebaSesion
                                                      .fechaInicio
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
                                                    prueba.pruebaSesion
                                                      .fechaLimite
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
                                              Tiempo:{' '}
                                            </span>
                                            {
                                              prueba.pruebaSesion
                                                .duracionMinutos
                                            }{' '}
                                            minutos
                                          </p>
                                          <p>
                                            <span className="fw-bold">
                                              Estado:{' '}
                                            </span>{' '}
                                            {prueba &&
                                            prueba.usuarioRealizaPrueba != null
                                              ? prueba.usuarioRealizaPrueba
                                                  .intentoCompletado
                                                ? 'Prueba completada'
                                                : 'En proceso'
                                              : 'Pendiente'}
                                          </p>
                                          {prueba &&
                                          prueba.usuarioRealizaPrueba !=
                                            null ? (
                                            prueba.usuarioRealizaPrueba
                                              .intentoCompletado ? (
                                              <>
                                                <p>
                                                  <span className="fw-bold">
                                                    Calificación obtenida:
                                                  </span>{' '}
                                                  {prueba.usuarioRealizaPrueba &&
                                                    prueba.usuarioRealizaPrueba
                                                      .calificacion}
                                                  {' / '}
                                                  {prueba &&
                                                    prueba.calificacionMaxima}
                                                </p>
                                                <div>
                                                  {prueba.usuarioRealizaPrueba &&
                                                  prueba.usuarioRealizaPrueba
                                                    .intentoCompletado ? (
                                                    prueba.usuarioRealizaPrueba
                                                      .porcentaje >= 90 ? (
                                                      <p className="text-center text-success">
                                                        <BiHappyBeaming
                                                          size={30}
                                                        />
                                                        Muchas felicitaciones
                                                        ¡Te ha ido de maravilla
                                                        en esta prueba!
                                                      </p>
                                                    ) : prueba
                                                        .usuarioRealizaPrueba
                                                        .porcentaje >= 70 ? (
                                                      <p className="text-center text-warning">
                                                        <GiSurprised
                                                          size={30}
                                                        />
                                                        No has reprobado, pero
                                                        vamos a estudiar más
                                                        para que la próxima vez
                                                        te vaya mejor.
                                                      </p>
                                                    ) : (
                                                      <p className="text-center text-danger">
                                                        <BiSad size={30} />
                                                        Has reprobado, pero
                                                        anímate. Sigue
                                                        estudiando para que te
                                                        vaya mejor.
                                                      </p>
                                                    )
                                                  ) : null}
                                                </div>
                                              </>
                                            ) : null
                                          ) : null}
                                        </div>
                                      </Card.Body>
                                    </Card>
                                  ))}
                                <Pagination
                                  actualPage={selectedPruebasPage}
                                  recordsTotal={pruebasRecordsTotal}
                                  pageSize={pruebasPageSize}
                                  handlePageChange={handlePruebasPageChange}
                                />
                              </>
                            ) : (
                              <div className="w-100 p-5 text-center">
                                <h2>Esta sesión no tiene pruebas asignadas.</h2>
                              </div>
                            )}
                          </>
                        )}
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
                    <Tab.Pane eventKey="insignias">
                      {sessionBadges && sessionBadges.length > 0 ? sessionBadges && sessionBadges.map((badge, index) => (<Col key={index} className="mb-3">
                      <Card
                        
                      >
                        <Card.Header className="text-center fw-bold">{badge.insignia.nombre}</Card.Header>
                        <Card.Img
                          className="my-3"
                          height={50}
                          src={badge.insignia.imgData}
                        ></Card.Img>
                        <Card.Footer className="text-center">{badge.insignia.descripcion}</Card.Footer>
                      </Card>
                    </Col>)) : <h1 className="text-center">Usted no tiene insignias asignadas</h1> }
                      {}
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
