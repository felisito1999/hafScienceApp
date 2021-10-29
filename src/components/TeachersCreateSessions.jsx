import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import sessionsService from '../services/sessionsService';
import userService from '../services/usersService';
import Pagination from './Pagination';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';

const TeachersCreateSessions = (props) => {
  const history = useHistory();

  const host = process.env.REACT_APP_HOST_NAME;

  const [session, setSession] = useState({
    nombre: '',
    descripcion: '',
    usuariosSesiones: [],
  });

  const [addUsers, setAddUsers] = useState([]);

  const [searchParameters, setSearchParameters] = useState({
    name: '',
  });

  const [usersSelectedPage, setUsersSelectedPage] = useState(1);
  const [usersPageSize, setUsersPageSize] = useState(3);
  const [recordsTotal, setRecordsTotal] = useState(0);

  const getUsers = async (page, pageSize, searchParameters) => {
    const response = await userService.getAllPaginatedUsersBy(
      page,
      pageSize,
      searchParameters
    );
    if (typeof (response.recordsTotal !== 'undefined')) {
      setRecordsTotal(response.recordsTotal);
      setAddUsers(response.records);
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
    console.log(studentId);
    for (let i = 0; i < session.usuariosSesiones.length; i++) {
      if (session.usuariosSesiones[i].id === studentId) {
        return true;
      }
    }
    return false;
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
      nombre: session.nombre,
      descripcion: session.descripcion,
      usuariosSesiones: newSessionStudents,
    };

    const result = await sessionsService.saveSession(sessionModel);

    if (typeof result !== 'undefined') {
      console.log('Ta bueno');
      if (result.status === 200) {
        history.push(`${host}prof-sesiones`);
      } else {
        alert('Ha sucedido un error');
      }
    } else {
      alert('Ha sucedido un error');
    }
  };

  useEffect(() => {
    getUsers(usersSelectedPage, usersPageSize, searchParameters);
  }, []);

  return (
    <div className="component-wrapper">
      <div className="container banner-bg rounded-3 shadow py-3 my-5">
        <h1 className="banner-title text-center">Agregar sesiones</h1>
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
                  onChange={handleDescripcionChange}
                  required
                ></textarea>
              </div>
              <div className="pt-5 mt-5"></div>
            </div>
          </section>
          <section className="p-4 m-1 rounded bg-light col-12 col-md-6">
            <h6 className="text-center fw-bold">Usuarios</h6>
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
                {addUsers &&
                  addUsers.map((user) => (
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
                      <td>{user.id}</td>
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
              Se agregarán los siguientes estudiantes a la sesión:
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
                  session.usuariosSesiones.map((user) => (
                    <tr
                      key={user.id}
                      onClick={(e) => {
                        e.preventDefault();
                        handleStudents(user);
                      }}
                    >
                      <td></td>
                      <td>{user.id}</td>
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
              Agregar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachersCreateSessions;
