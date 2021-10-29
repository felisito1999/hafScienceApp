import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { IoSchool } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import sessionsService from '../services/sessionsService';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import Pagination from './Pagination';
import userService from '../services/usersService';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const SessionDetails = (props) => {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [updatesession, setUpdatesession] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [users, setUsers] = useState([]);
  const [usersSelectedPage, setUsersSelectedPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(3);
  const [usersRecordsTotal, setUsersRecordsTotal] = useState(0);

  const handlePageChange = (selectedPage) => {
    setUsersSelectedPage(selectedPage);
    getSessionUsers(selectedPage, usersPageSize, sessionId);
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
    props.onHide();
  };

  const handleDeletesession = async () => {
    if (isDeleting) {
      const response = await sessionsService.disablesession(session.id);
      console.log(response);
      if (typeof response !== 'undefined' && response.status === 'Success') {
        props.onHide();
        alert('Se ha deshabilitado el centro educativo con éxito');
      } else {
        alert('No se ha podido deshabilitar el centro educativo');
      }
    }
  };

  const handleEnableUpdate = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setUpdatesession(session);
  };

  const handlesessionUpdate = async (session) => {
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

  useEffect(() => {
    const getInitData = async () => {
      const sessionData = await sessionsService.getById(sessionId);
      setSession(sessionData.data);
      getSessionUsers(usersSelectedPage, usersPageSize, sessionId);
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
            object={'centro educativo'}
            handleConfirmDelete={handleDeletesession}
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
        <form
          autoComplete="off"
          className="form"
          onSubmit={handlesessionUpdate}
        >
          {isEditing ? (
            <>
              <div className="form-group">
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
              <div className="py-5 d-flex flex-column align-items-center">
                <p className="fw-bold">Descripción</p>
                <p>{session && session.descripcion}</p>
                <p className="fw-bold">Centro Educativo</p>
                <p>{session && session.nombreCentroEducativo}</p>
                {/* Agregar la parte de la fecha de ingreso en el sistema */}
              </div>
              <h5 className="fw-bold">Actividades:</h5>
              <h5 className="fw-bold">Participantes:</h5>
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
                              <span className="fw-lighter">{user.id}</span>
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
                    <h2>No se encontraron sesiones administradas por usted</h2>
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
            </>
          )}
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.preventDefault();
              handleOpenDelete();
            }}
          >
            Deshabilitar Sesión
          </button>
          {isEditing ? (
            <button className="btn btn-danger" onClick={handleEnableUpdate}>
              Volver a visualizar información de la sesión
            </button>
          ) : null}
          <button
            type="submit"
            className="btn btn-warning"
            onClick={(e) => {
              if (isEditing) {
                e.preventDefault();
                handlesessionUpdate(updatesession);
              } else {
                handleEnableUpdate(e);
              }
            }}
          >
            Modificar sesión
          </button>
        </form>
      </section>
    </div>
  );
};

export default SessionDetails;
