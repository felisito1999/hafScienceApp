import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoSchool } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import sessionsService from '../services/sessionsService';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import Pagination from './Pagination';
import userService from '../services/usersService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Dropdown from 'react-bootstrap/Dropdown';
import { GrAdd } from 'react-icons/gr';
import testsService from '../services/testsService';
import AssignTestToSessionModal from './AssignTestToSessionModal';
import LoadingIcon from './LoadingIcon';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';

const SessionDetails = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();
  const { sessionId } = useParams();
  const [isSessionInfoLoading, setIsSessionInfoLoading] = useState(true);

  const [session, setSession] = useState(null);
  const [updatesession, setUpdatesession] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersSelectedPage, setUsersSelectedPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(3);
  const [usersRecordsTotal, setUsersRecordsTotal] = useState(0);
  const [pruebasDiagnosticas, setPruebasDiagnosticas] = useState([]);
  const [selectedPruebasPage, setSelectedPruebasPage] = useState(1);
  const [pruebasPageSize, setPruebasPageSize] = useState(5);
  const [pruebasRecordsTotal, setPruebasRecordsTotal] = useState(0);
  const [selectedReport, setSelectedReport] = useState(1);
  const [reportData, setReportData] = useState(null);
  const [isReportLoading, setIsReportLoading] = useState(false);

  const [arePruebasLoading, setArePruebasLoading] = useState(true);

  const [sessionActivity, setSessionActivity] = useState([]);

  const [isAddTestsModalOpen, setIsAddTestsModalOpen] = useState(false);

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

  const handleReportSelect = async (e) => {
    const selectValue = e.target.value;
    console.log(selectValue);
    setSelectedReport(selectValue);
    setIsReportLoading(true);
    await getReportData(selectValue);
    setIsReportLoading(false);
  };

  const generateReport = (reportType) => {
    if (reportType) {
      if (reportType == 1) {
        const input = document.getElementById('reporte-promedio-calificaciones');
        const pdf = new jsPDF();

        if (pdf) {
          domtoimage.toJpeg(input, {quality: 1.0})
            .then(imgData => {
              pdf.addImage(imgData, 'JPEG', 10, 10);
              pdf.save('reporte-promedio-calificaciones.pdf');
            });
        }
      }
    }
  };

  const pieColors = ['#4DB6AC', '#DC3545'];

  const radian = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * radian);
    const y = cy + radius * Math.sin(-midAngle * radian);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const getReportData = async (type) => {
    try {
      if (type && type == 1) {
        const response = await testsService.getSessionAverageGrades(sessionId);

        if (response) {
          console.log(response);
          const report = [
            {
              name: 'Promedio de calificaciones',
              value: response.data.notaPromedio,
            },
          ];

          if (response.data.notaPromedio < 100) {
            report.push({
              name: 'restante',
              value: 100 - response.data.notaPromedio,
            });
          }
          setReportData(report);
        }
      }
    } catch (error) {}
  };

  const getSessionUsers = async (selectedPage, pageSize, sessionId) => {
    const sessionUsers = await userService.getPaginatedSessionStudents(
      selectedPage,
      pageSize,
      sessionId
    );
    setUsers(sessionUsers.data.records);
    setUsersRecordsTotal(sessionUsers.data.recordsTotal);
  };

  const handleNombreChange = (e) => {
    e.preventDefault();

    setUpdatesession({
      ...updatesession,
      nombre: e.target.value,
    });
  };

  const handleDireccionChange = (e) => {
    e.preventDefault();

    setUpdatesession({
      ...updatesession,
      direccion: e.target.value,
    });
  };

  const handleOpenDelete = () => {
    setIsDeleting(true);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
  };

  const handleDeleteSession = async () => {
    if (isDeleting) {
      const response = await sessionsService.deleteSession(session.id);
      console.log(response);
      if (typeof response !== 'undefined' && response.status === 'Success') {
        props.onHide();
        alert('Se ha deshabilitado el centro educativo con éxito');
      } else {
        alert('No se ha podido deshabilitar el centro educativo');
      }
    }
  };

  const handleOpenAddTestModal = () => {
    setIsAddTestsModalOpen(!isAddTestsModalOpen);
  };

  const handleAddTestToSession = async (assignmentInfo) => {
    try {
      const result = await testsService.assignTestToSession(assignmentInfo);

      if (result) {
        if (result.status === 200) {
          handleOpenAddTestModal();

          const sessionData = await sessionsService.getById(sessionId);
          setSession(sessionData.data);
          getSessionUsers(usersSelectedPage, usersPageSize, sessionId);
          setIsSessionInfoLoading(true);
          await getSessionsPruebasDiagnosticas(
            sessionId,
            selectedPruebasPage,
            pruebasPageSize
          );
          setIsSessionInfoLoading(false);
          handleOpenAddTestModal();

          alert('Se ha añadido la prueba a la sesión exitosamente');
        }
      }
    } catch (error) {}
  };

  const getSessionsPruebasDiagnosticas = async (sessionId, page, pageSize) => {
    setArePruebasLoading(true);
    try {
      const result = await testsService.getBySessionId(
        page,
        pageSize,
        sessionId
      );
      if (result) {
        setPruebasDiagnosticas(result.data.records);
        setPruebasRecordsTotal(result.data.recordsTotal);
      }
    } catch (error) {
      console.log(error);
    }
    setArePruebasLoading(false);
  };

  const handleSessionUpdate = async (session) => {
    if (isEditing) {
      const response = await sessionsService.updatesession(session);
      if (typeof response !== 'undefined' && response.status === 'Success') {
        props.onHide();
        alert('Se ha modificado el centro educativo con éxito');
      } else {
        alert('No se ha podido modificar el centro educativo');
      }
    }
  };

  const getSessionActivity = async (sessionId) => {
    try {
      const result = await sessionsService.getSessionActivity(sessionId);
      if (result) {
        setSessionActivity(result.data);
      }
    } catch (error) {}
  };

  const goToPruebaGrades = async (sessionId, testId) => {
    console.log("Hello")
    history.push(`${host}prof-sesiones/calificaciones-prueba/${sessionId}/${testId}`);
  }

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
      await getSessionActivity(sessionId);
      setIsSessionInfoLoading(false);
    };

    getInitData();
  }, []);
  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5">
        {isDeleting ? (
          <ConfirmDeleteModal
            show={isDeleting}
            onHide={handleCloseDelete}
            object={'sesión'}
            handleConfirmDelete={handleDeleteSession}
          />
        ) : null}
        {isAddTestsModalOpen ? (
          <AssignTestToSessionModal
            show={isAddTestsModalOpen}
            onHide={handleOpenAddTestModal}
            onSelecting={handleAddTestToSession}
            sessionId={sessionId}
          />
        ) : null}
        <div className="d-flex justify-content-end">
          <Dropdown>
            <Dropdown.Toggle
              className="border-0 text-dark"
              id="session-details-options-dropdown"
            >
              <BsThreeDotsVertical size={25} />{' '}
            </Dropdown.Toggle>

            <Dropdown.Menu className="bg-light">
              <Link
                to={`${host}prof-sesiones/actualizar/${sessionId}`}
                className="py-3 dropdown-item text-dark text-decoration-none"
              >
                <AiFillEdit size={20} /> <span>Actualizar</span>
              </Link>

              <button
                className="py-3 dropdown-item text-dark text-decoration-none"
                onClick={handleOpenDelete}
              >
                <AiFillDelete size={20} /> <span>Deshabilitar</span>
              </button>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
            <form
              autoComplete="off"
              className="form"
              onSubmit={handleSessionUpdate}
            >
              {isEditing ? (
                <>
                  <div className="form-group">/
                    <input
                      type="text"
                      name="nombre"
                      id="nombre"
                      value={updatesession.nombre}
                      autoComplete="off"
                      minLength="2"
                      maxLength="50"
                      onChange={handleNombreChange}
                      required
                    />
                    <label htmlFor="nombres" className="label-top">
                      <span className="label-content">Nombres</span>
                    </label>
                    <div className="underline"></div>
                  </div>
                  <div className="form-group mt-5">
                    <label htmlFor="direccion" className="form-label mb-4">
                      <span>Dirección</span>
                    </label>
                    <textarea
                      type="text"
                      name="direccion"
                      id="direccion"
                      value={updatesession.direccion}
                      className="form-control"
                      autoComplete="off"
                      minLength="25"
                      maxLength="128"
                      rows="2"
                      onChange={handleDireccionChange}
                      required
                    ></textarea>
                  </div>
                </>
              ) : (
                <>
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
                              eventKey="actividad"
                            >
                              Actividad
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
                          <Nav.Item className="tab-pills">
                            <Nav.Link
                              className="tab-pills-children"
                              eventKey="reportes"
                            >
                              Reportes
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
                            <div className="mb-3 container">
                              <button
                                className="w-100 fw-bold btn btn-success d-flex"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleOpenAddTestModal();
                                }}
                              >
                                <GrAdd className="fw-bolder" size={20} />
                                <span className="flex-grow-1">
                                  Añadir prueba
                                </span>
                              </button>
                              {/* Agregar la parte de la fecha de ingreso en el sistema */}
                            </div>
                            <div className="container">
                              {arePruebasLoading ? (
                                <LoadingIcon />
                              ) : (
                                <>
                                  {pruebasDiagnosticas &&
                                  pruebasDiagnosticas.length > 0 ? (
                                    <>
                                      {pruebasDiagnosticas &&
                                        pruebasDiagnosticas.map(
                                          (prueba, index) => (
                                            <Card
                                              key={index}
                                              className="pointer-cursor mb-3"
                                              onClick={(e) => {
                                                e.preventDefault()
                                                goToPruebaGrades(sessionId, prueba.id)
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
                                                    {prueba &&
                                                    prueba.pruebaSesion
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
                                                    {prueba &&
                                                    prueba.pruebaSesion
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
                                                </div>
                                              </Card.Body>
                                            </Card>
                                          )
                                        )}
                                      <Pagination
                                        actualPage={selectedPruebasPage}
                                        recordsTotal={pruebasRecordsTotal}
                                        pageSize={pruebasPageSize}
                                        handlePageChange={
                                          handlePruebasPageChange
                                        }
                                      />
                                    </>
                                  ) : (
                                    <div className="w-100 p-5 text-center">
                                      <h2>
                                        Esta sesión no tiene pruebas
                                        diagnósticas asignadas.
                                      </h2>
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
                                  <Col key={user.id}>
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
                                  <h2>
                                    Esta sesión no tiene estudiantes asignados.
                                  </h2>
                                </div>
                              )}
                            </Row>
                            <p className="fw-bold">
                              Cantidad total de estudiantes:{' '}
                              <span className="fw-bolder">
                                {usersRecordsTotal}
                              </span>
                            </p>
                            <Pagination
                              actualPage={usersSelectedPage}
                              recordsTotal={usersRecordsTotal}
                              pageSize={usersPageSize}
                              handlePageChange={handlePageChange}
                            />
                          </Tab.Pane>
                          <Tab.Pane eventKey="actividad">
                            <Row xs={1}></Row>
                            {sessionActivity && sessionActivity.length == 0 ? (
                              <h1 className="text-center my-5">
                                No hay actividad registrada en esta sesión
                              </h1>
                            ) : (
                              <>
                                {' '}
                                {sessionActivity &&
                                  sessionActivity.map(
                                    (sessionActivity, index) => (
                                      <Col key={index} className="mb-3">
                                        <Card>
                                          <Card.Header>
                                            <p>
                                              {sessionActivity.intentoCompletado ? (
                                                <>
                                                  <span className="fw-bold">
                                                    {
                                                      sessionActivity.usuario
                                                        .nombreUsuario
                                                    }
                                                  </span>{' '}
                                                  completó la prueba{' '}
                                                  <span className="fw-bold">
                                                    {
                                                      sessionActivity
                                                        .pruebaDiagnostica
                                                        .titulo
                                                    }
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  <span className="fw-bold">
                                                    {
                                                      sessionActivity.usuario
                                                        .nombreUsuario
                                                    }
                                                  </span>{' '}
                                                  intentó realizar la prueba{' '}
                                                  <span className="fw-bold">
                                                    {
                                                      sessionActivity
                                                        .pruebaDiagnostica
                                                        .titulo
                                                    }
                                                  </span>
                                                </>
                                              )}
                                            </p>
                                          </Card.Header>
                                          <Card.Body>
                                            <p>
                                              <span className="fw-bold">
                                                Fecha:{' '}
                                              </span>
                                              {format(
                                                Date.parse(
                                                  sessionActivity.fechaCreacion
                                                ),
                                                'PPp',
                                                { locale: es }
                                              )}
                                            </p>
                                            {sessionActivity.intentoCompletado ? (
                                              <p>
                                                <span className="fw-bold">
                                                  Calificación:{' '}
                                                </span>
                                                {sessionActivity.calificacion}
                                              </p>
                                            ) : null}
                                          </Card.Body>
                                        </Card>
                                      </Col>
                                    )
                                  )}
                              </>
                            )}
                            {/* Agregar la parte de la fecha de ingreso en el sistema */}
                          </Tab.Pane>
                          <Tab.Pane eventKey="insignias">
                            <h1>Hello world</h1>
                          </Tab.Pane>
                          <Tab.Pane eventKey="reportes">
                            <div>
                              <div className="form-floating">
                                <select
                                  name="report-type"
                                  id="report-type"
                                  className="form-select"
                                  defaultValue={0}
                                  onChange={handleReportSelect}
                                >
                                  <option value="0">
                                    Selecciona un reporte
                                  </option>
                                  <option value="1">
                                    Reporte de promedio de calificaciones
                                  </option>
                                </select>
                                <label htmlFor="report-select">Reportes</label>
                              </div>
                              <div>
                                <div className="my-3 d-flex flex-column align-items-center justify-content-center">
                                  {selectedReport == 1 ? (
                                    isReportLoading ? (
                                      <LoadingIcon />
                                    ) : reportData ? (
                                      <>
                                        <div className="w-100 d-flex flex-column align-items-center">
                                          <button
                                            className="w-100 btn btn-success mb-3"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              generateReport(1);
                                            }}
                                          >
                                            Generar reporte
                                          </button>
                                        </div>
                                        <div id="reporte-promedio-calificaciones" className="bg-light d-flex flex-column align-items-center">
                                          <div>
                                            <p className="fw-bold">Leyenda</p>
                                            <p>
                                              <span className="text-success">
                                                &#9632;
                                              </span>{' '}
                                              Respuestas correctas
                                            </p>
                                            <p>
                                              <span className="text-danger">
                                                &#9632;
                                              </span>{' '}
                                              Respuestas incorrectas
                                            </p>
                                          </div>
                                          <PieChart width={750} height={350}>
                                            <Pie
                                              data={reportData}
                                              dataKey="value"
                                              nameKey="name"
                                              cx="50%"
                                              cy="50%"
                                              fill="#8884d8"
                                              labelLine={false}
                                              label={renderCustomizedLabel}
                                            >
                                              {reportData.map(
                                                (entry, index) => (
                                                  <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                      pieColors[
                                                        index % pieColors.length
                                                      ]
                                                    }
                                                  />
                                                )
                                              )}
                                            </Pie>
                                          </PieChart>
                                        </div>
                                      </>
                                    ) : null
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </Tab.Container>
                    </div>
                  </div>
                </>
              )}
            </form>
          </>
        )}
      </section>
    </div>
  );
};

export default SessionDetails;
