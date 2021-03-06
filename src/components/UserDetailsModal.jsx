import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import rolesService from '../services/rolesService';
import schoolsService from '../services/schoolsService';
import userService from '../services/usersService';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';

const UserDetailsModal = (props) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [centrosEducativos, setCentrosEducativos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const today = new Date();

  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDay());

  const handleNombresChange = (e) => {
    setUser({
      ...user,
      nombres: e.target.value,
    });
  };

  const handleApellidosChange = (e) => {
    setUser({
      ...user,
      apellidos: e.target.value,
    });
  };

  const handleFechaNacimientoChange = (value) => {

    setUser({
      ...user,
      fechaNacimiento: value,
    });
    console.log(value);
  };

  const telefonoInputMask = (telephone) => {
    if (telephone.length >= 3) {
    }
  };

  const handleTelefonoChange = (e) => {
    setUser({
      ...user,
      telefono: e.target.value,
    });
  };

  const handleCorreoElectronicoChange = (e) => {
    setUser({
      ...user,
      correoElectronico: e.target.value,
    });
  };

  const handleNombreUsuarioChange = (e) => {
    setUser({
      ...user,
      nombreUsuario: e.target.value,
    });
  };

  const handleRolChange = (e) => {
    setUser({
      ...user,
      rolId: e.target.value,
    });
  };

  const handleCentroEducativoChange = (e) => {
    setUser({
      ...user,
      centroEducativoId: e.target.value,
    });
  };

  const handleEnableUpdate = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
  };

  const handleUserUpdate = async (user) => {
    if (isEditing) {
      const response = await userService.updateUser(user);

      if(typeof(response.status) !== 'undefined'){
        console.log(response.status);
        if (response.status === 200) {
          props.onHide();
          alert('Se ha modificado el usuario con ??xito');
        } else {
          alert('No se ha podido modificar el usuario');
        }
      }
    }
  };

  const handleOpenDelete = () => {
    setIsDeleting(true);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
    props.onHide();
  };

  const handleDeleteUser = async () => {
    if (isDeleting) {
      const response = await userService.disableUser(user.id);
      console.log(response.status)
      if(typeof(response.status) !== 'undefined'){
        if (response.status === 200) {
          props.onHide();
          alert('Se ha deshabilitado el usuario con ??xito');
        } else {
          alert('No se ha podido deshabilitar el usuario');
        }
      }
      else {
        alert('No se ha podido deshabilitar el usuario');
      }
    }
  };

  const validateFields = () => {

  }

  useEffect(() => {
    const getInitData = async () => {
      const userData = await userService.getById(props.userId);
      console.log(userData);
      if (userData !== null) {
        setUser(userData.data);
      }
      const initRoles = await rolesService.getAll();

      if (typeof initRoles !== 'undefined' && initRoles.status === 200) {
        setRoles(initRoles.data);
      }

      const initCentrosEducativos = await schoolsService.getAll();
      console.log(initCentrosEducativos);
      if (centrosEducativos){
        setCentrosEducativos(initCentrosEducativos.data);
      }
    };
    getInitData();
  }, [props.userId]);
  return (
    <>
      {isDeleting ? (
        <ConfirmDeleteModal
          show={isDeleting}
          onHide={handleCloseDelete}
          object={'usuario'}
          handleConfirmDelete={handleDeleteUser}
        />
      ) : null}

      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="fw-bold d-flex justify-content-center"
          closeButton
        >
          <h5 className="text-center">Informacion del usuario</h5>
        </Modal.Header>
        <Modal.Body>
          <form autoComplete="off" className="form" onSubmit={handleUserUpdate}>
            {isEditing ? (
              <>
                <div className="form-group">
                  <input
                    type="text"
                    name="nombres"
                    id="nombres"
                    value={user.nombres}
                    autoComplete="off"
                    minLength="2"
                    maxLength="25"
                    onChange={handleNombresChange}
                    required
                  />
                  <label htmlFor="nombres" className="label-top">
                    <span className="label-content">Nombres</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="apellidos"
                    id="apellidos"
                    value={user.apellidos}
                    autoComplete="off"
                    minLength="2"
                    maxLength="25"
                    onChange={handleApellidosChange}
                    required
                  />
                  <label htmlFor="apellidos" className="label-top">
                    <span className="label-content">Apellidos</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div>
            <DateTimePicker
              value={new Date(user.fechaNacimiento)}
              // onClick={handleChangeMaxDate}
              maxDate={maxDate}
              onChange={handleFechaNacimientoChange}
              format="dd-MM-y"
              className="form-control"
              required
            />
          </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={user.telefono}
                    onChange={handleTelefonoChange}
                    required
                  />
                  <label htmlFor="telefono" className="">
                    <span className="label-content">Telefono</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    minLength="6"
                    maxLength="254"
                    value={user.correoElectronico}
                    onChange={handleCorreoElectronicoChange}
                    required
                  />
                  <label htmlFor="email" className="">
                    <span className="label-content">Correo electronico</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="form-group">
                  <select
                    name="centroEducativo"
                    id="centroEducativo"
                    className="form-control"
                    value={user.centroEducativoId}
                    onChange={handleCentroEducativoChange}
                  >
                    {centrosEducativos &&
                      centrosEducativos.map((centroEducativo) => (
                        <option
                          key={centroEducativo && centroEducativo.id}
                          value={centroEducativo && centroEducativo.id}
                        >
                          {centroEducativo && centroEducativo.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <p className="fw-bold">Nombre Completo</p>
                <p>
                  {user && user.nombres} {user && user.apellidos}
                </p>
                <p className="fw-bold">Nombre de usuario</p>
                <p>{user && user.nombreUsuario}</p>
                <p className="fw-bold">Rol</p>
                <p>{user && user.nombreRol}</p>
                <p className="fw-bold">Fecha de nacimiento</p>
                <p>
                  {user && user.fechaNacimiento
                    ? format(Date.parse(user && user.fechaNacimiento), 'PPP', {
                        locale: es,
                      })
                    : '01-01-2000'}
                </p>
                <p className="fw-bold">N??mero de tel??fono</p>
                <p>{user && user.telefono}</p>
                <p className="fw-bold">Correo electr??nico</p>
                <p>{user && user.correoElectronico}</p>
                <p className="fw-bold">Centro educativo</p>
                <p>{user && user.nombreCentroEducativo}</p>
                {/* Agregar la parte de la fecha de ingreso en el sistema */}
              </div>
            )}
            <Modal.Footer className="d-flex justify-content-evenly mt-5">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDelete();
                }}
              >
                Deshabilitar usuario
              </button>
              {isEditing ? (
                <button className="btn btn-danger" onClick={handleEnableUpdate}>
                  Volver a visualizar informaci??n del usuario
                </button>
              ) : null}
              <button
                type="submit"
                className="btn btn-warning"
                onClick={(e) => {
                  if (isEditing) {
                    e.preventDefault();
                    handleUserUpdate(user);
                  } else {
                    handleEnableUpdate(e);
                  }
                }}
              >
                Modificar usuario
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserDetailsModal;
