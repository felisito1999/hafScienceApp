import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import sessionsService from '../services/sessionsService';
import userService from '../services/usersService';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';
import Pagination from './Pagination';
import LoadingIcon from './LoadingIcon';

const UpdateSessions = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();
  const { sessionId } = useParams();

  const [availableUsers, setAvailableUsers] = useState([]);
  const [searchParameters, setSearchParameters] = useState({
    name: '',
  });

  const [usersPageSize, setUsersPageSize] = useState(3);
  const [usersSelectedPage, setUsersSelectedPage] = useState(1);
  const [recordsTotal, setRecordsTotal] = useState(0);

  const [isSessionLoading, setIsSessionLoading] = useState(true);

  const [session, setSession] = useState({
    sessionId: sessionId,
    nombre: '',
    descripcion: '',
    usuariosSesiones: [],
  });

  const getAvailableUsers = async (page, pageSize, searchParameters) => {
    const availableUsers = await userService.getAllPaginatedUsersBy(
      page,
      pageSize,
      searchParameters
    );

    if (typeof (availableUsers.recordsTotal !== 'undefined')) {
      setRecordsTotal(availableUsers.recordsTotal);
      setAvailableUsers(availableUsers.records);
    }
  };

  const getSessionInfo = async (sessionId) => {
    const sessionDetails = await sessionsService.getById(sessionId);
    const sessionUsers = await userService.getPaginatedSessionStudents(
      usersSelectedPage,
      100, // Hay que poner que el metodo no sea paginado.
      sessionId
    );

    setSession({
      ...session,
      nombre: sessionDetails.data.nombre,
      descripcion: sessionDetails.data.descripcion,
      usuariosSesiones: sessionUsers.data.records,
    });
  };

  const getUsers = async (page, pageSize, searchParameters) => {
    const response = await userService.getAllPaginatedUsersBy(
      page,
      pageSize,
      searchParameters
    );
    if (typeof (response.recordsTotal !== 'undefined')) {
      setRecordsTotal(response.recordsTotal);
      setAvailableUsers(response.records);
    }
  };

  const handleStudents = (user) => {
    if (checkIfUsuariosSesionesContains(user.id)) {
      handleStudentsRemove(user);
    } else {
      handleStudentsAdd(user);
    }
  };

  const checkIfUsuariosSesionesContains = (studentId) => {
    if (Array.isArray(session.usuariosSesiones)) {
      for (let i = 0; i < session.usuariosSesiones.length; i++) {
        if (session.usuariosSesiones[i].id === studentId) {
          return true;
        }
      }
      return false;
    }
  };

  const handleStudentsAdd = (student) => {
    const newEstudiantes = session.usuariosSesiones;
    newEstudiantes.push(student);
    setSession({
      ...session,
      usuariosSesiones: newEstudiantes,
    });
  };

  const handleStudentsRemove = (student) => {
    const newEstudiantes = session.usuariosSesiones.filter(
      (value, index, array) => {
        return value.id !== student.id;
      }
    );

    setSession({
      ...session,
      usuariosSesiones: session.usuariosSesiones.filter(
        (value, index, array) => {
          return value.id !== student.id;
        }
      ),
    });
  };

  const handleNombreChange = (e) => {
    setSession({
      ...session,
      nombre: e.target.value,
    });
  };

  const handleDescripcionChange = (e) => {
    setSession({
      ...session,
      descripcion: e.target.value,
    });
  };

  const handleUserNameChange = (e) => {
    setSearchParameters({
      ...searchParameters,
      name: e.target.value,
    });
  };

  const handleNewUsersSearch = async (e) => {
    e.preventDefault();
    getUsers(1, usersPageSize, searchParameters);
    setUsersSelectedPage(1);
  };

  const handlePageChange = (selectedPage) => {
    setUsersSelectedPage(selectedPage);
    getUsers(selectedPage, usersPageSize);
  };

  const handleSessionSubmit = async (e) => {
    e.preventDefault();
    let newSessionStudents = [];

    session.usuariosSesiones.forEach((item) => {
      const newStudent = {
        usuarioId: item.id,
        sessionId: 0,
        nombreUsuario: item.nombreUsuario,
        nombreSesion: '',
      };

      newSessionStudents.push(newStudent);
    });

    const sessionModel = {
      sessionId: session.sessionId,
      nombre: session.nombre,
      descripcion: session.descripcion,
      usuariosSesiones: newSessionStudents,
    };

    const result = await sessionsService.updateSession(sessionModel);

    if (typeof result !== 'undefined') {
      if (result.status === 200) {
        history.push(`${host}prof-sesiones`);
        alert('¡La sesión ha sido actualizada satisfactoriamente!');
      } else {
        alert('Ha sucedido un error');
      }
    } else {
      alert('Ha sucedido un error');
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await getSessionInfo(sessionId);
        await getAvailableUsers(
          usersSelectedPage,
          usersPageSize,
          searchParameters
        );
        setIsSessionLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    init();
  }, []);

  return (
    <div className="component-wrapper">
      <div className="container banner-bg rounded-3 shadow py-3 my-5">
        <h1 className="banner-title text-center">Actualizar sesiones</h1>
        {isSessionLoading ? (
          <LoadingIcon />
        ) : (
          <div className="row justify-content-center">
            <section className="p-4 m-1 rounded bg-light col-12 col-md-5">
              <h6 className="text-center fw-bold">Detalles</h6>
              <div autoComplete="off" className="form">
                <div className="form-group">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={session.nombre}
                    autoComplete="off"
                    minLength="2"
                    maxLength="50"
                    onChange={handleNombreChange}
                    required
                  />
                  <label htmlFor="nombres" className="label-top">
                    <span className="label-content">Nombre de sesión</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="form-group mt-5">
                  <label htmlFor="direccion" className="form-label mb-4">
                    <span>Descripción</span>
                  </label>
                  <textarea
                    type="text"
                    name="direccion"
                    id="direccion"
                    className="form-control"
                    autoComplete="off"
                    minLength="25"
                    maxLength="128"
                    rows="5"
                    style={{
                      resize: 'none',
                      position: 'relative',
                    }}
                    value={session.descripcion}
                    onChange={handleDescripcionChange}
                    required
                  ></textarea>
                </div>
                <div className="pt-5 mt-5"></div>
              </div>
            </section>
            <section className="p-4 m-1 rounded bg-light col-12 col-md-6">
              <h6 className="text-center fw-bold">Usuarios del centro</h6>
              <form onSubmit={handleNewUsersSearch}>
                <div className="d-flex">
                  <div className="py-2 pr-2 flex-grow-1">
                    <input
                      type="text"
                      placeholder="Nombre"
                      className="form-control"
                      onChange={handleUserNameChange}
                    />
                  </div>
                  <div className="p-2">
                    <button type="submit" className="btn btn-success">
                      Buscar
                    </button>
                  </div>
                </div>
              </form>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Código</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {availableUsers &&
                    availableUsers.map((user) => (
                      <tr
                        key={user.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleStudents(user);
                        }}
                      >
                        {checkIfUsuariosSesionesContains(user.id) ? (
                          <td className="text-success">
                            <AiFillCheckCircle size={25} />
                          </td>
                        ) : (
                          <td>
                            <BiCircle size={25} />
                          </td>
                        )}
                        <td>{user.codigo}</td>
                        <td>
                          {user.nombres} {user.apellidos}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Pagination
                actualPage={usersSelectedPage}
                recordsTotal={recordsTotal}
                pageSize={usersPageSize}
                handlePageChange={handlePageChange}
              />
              <hr className="text-dark opacity-100" style={{ height: '2px' }} />
              <h4 className="text-center">
                Los siguientes estudiantes tendrán acceso a la sesión:
              </h4>
              <table className="table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Código</th>
                    <th>Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {session &&
                    session.usuariosSesiones &&
                    session.usuariosSesiones.map((user) => (
                      <tr
                        key={user.id}
                        onClick={(e) => {
                          e.preventDefault();
                          handleStudents(user);
                        }}
                      >
                        <td></td>
                        <td>{user.codigo}</td>
                        <td>
                          {user.nombres} {user.apellidos}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </section>
            <div className="d-flex justify-content-between mt-5">
              <button
                type="button"
                className="btn btn-danger"
                onClick={props.onHide}
              >
                cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSessionSubmit}
              >
                Actualizar sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateSessions;
