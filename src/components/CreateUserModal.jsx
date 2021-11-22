import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import userService from '../services/usersService';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';

const CreateUserModal = (props) => {
  const defaultUserValues = {
    nombres: '',
    apellidos: '',
    fechaNacimiento: new Date(2000, 0, 1),
    telefono: '',
    correoElectronico: '',
    rolId: 1,
    centroEducativoId: 1,
    esSuperAdministrador: false,
    creadoPor: JSON.parse(localStorage.getItem('userData')).id,
  };

  const [user, setUser] = useState({
    ...defaultUserValues,
  });

  const [roles, setRoles] = useState([null]);
  const [centrosEducativos, setCentrosEducativos] = useState([null]);

  const getInitRoles = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}roles`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: null,
    };

    try {
      const response = await axios(config);
      console.log(response.data[0].id);
      setUser({
        ...user,
        rolId: response.data[0].id,
      });
      setRoles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInitCentrosEducativos = async () => {
    const config = {
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}centroseducativos/getall`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: null,
    };
    try {
      const response = await axios(config);
      setUser({
        ...user,
        centroEducativoId: response.data[0].id,
      });
      setCentrosEducativos(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

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
    // setUser({
    //   ...user,
    //   fechaNacimiento: e.target.value,
    // });'
    setUser({
      ...user,
      fechaNacimiento: value,
    });
    console.log(value);
  };

  // const telefonoInputMask = (telephone) => {
  //     if (telephone.length >= 3) {
  //     }
  // };

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

  const handleChangeMaxDate = () => {

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }

    if (mm < 10) {
      mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("fecha-nacimiento").setAttribute("max", today);
    //
    var userRolID = document.getElementById("rol").value;
    var fecha = document.getElementById("fecha-nacimiento").value;
    if(userRolID == 2 || userRolID == 1)
    {
      var newYear = yyyy - 18;
      var min = newYear + '-' + mm + '-' + dd;
      document.getElementById("fecha-nacimiento").setAttribute("max", min);
      // fecha = min;
    }
    else
    {
      document.getElementById("fecha-nacimiento").setAttribute("max", today);
      // fecha = today;
    }
  }
  
  const today = new Date();

  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDay());

  const handleRolChange = (e) => {
    const rolId = e.target.value; 

    if (rolId != 1) {
      setUser({
        ...user,
        rolId: rolId,
        esSuperAdministrador: false,
      });
    } else {
      setUser({
        ...user,
        rolId: rolId,
      });
    }
  };

  const handleCentroEducativoChange = (e) => {
    setUser({
      ...user,
      centroEducativoId: e.target.value,
    });

    console.log(e.target.value);
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(JSON.stringify(user));
      const response = await userService.registerUser(user);
      alert(response.data.message);
      clearFields();
    } catch (error) {
      if (error) {
        if (error.response) {
          alert(error.response.data.message);
        }
      }
    }
  };

  const handleIsSuperadministradorChange = (e) => {
    const isChecked = e.target.checked; 

    if (isChecked){
      setUser({
        ...user,
        esSuperAdministrador: isChecked,
        centroEducativoId: 0
      });
    } else {
      setUser({
        ...user,
        esSuperAdministrador: isChecked,
        centroEducativoId: 1
      });
      console.log(e.target.checked)
    }
  };

  const clearFields = () => {
    setUser({
      ...defaultUserValues,
    });
  };

  useEffect(() => {
    const initData = async () => {
      getInitRoles();
      getInitCentrosEducativos();
    };
    // const date = Date.now();

    // const currentDate = new Date();
    // let minStudentBirthDate = currentDate;
    // minStudentBirthDate = minStudentBirthDate.setFullYear(
    //   minStudentBirthDate.getFullYear() - 5
    // );

    // let minAdminBirthDate = currentDate;
    // minAdminBirthDate = minAdminBirthDate.setFullYear(
    //   minAdminBirthDate.getFullYear() - 5
    // );

    // let minTeacherBirthDate = new Date();
    // minTeacherBirthDate = minTeacherBirthDate.setFullYear(
    //   minTeacherBirthDate.getFullYear() - 18
    // );
    // console.log(minTeacherBirthDate);

    initData();
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="fw-bold text-center" closeButton>
        Ingrese los datos del nuevo usuario
      </Modal.Header>
      <Modal.Body>
        <form
          autoComplete="off"
          className="form"
          onSubmit={handleNewUserSubmit}
        >
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
              autoComplete="off"
              minLength="2"
              maxLength="25"
              value={user.apellidos}
              onChange={handleApellidosChange}
              required
            />
            <label htmlFor="apellidos" className="label-top">
              <span className="label-content">Apellidos</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            {/* <input
              type="date"
              name="fecha-nacimiento"
              id="fecha-nacimiento"
              value={user.fechaNacimiento}
              onChange={handleFechaNacimientoChange}
              required
            /> */}
            <label htmlFor="fecha-nacimiento" className="">
              <span className="label-content">Fecha de nacimiento</span>
            </label>
            <div className="underline"></div>
          </div>
          <div>
            <DateTimePicker
              value={user.fechaNacimiento}
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
              minLength="12"
              maxLength="12"
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
              className="form-control"
              name="rol"
              id="rol"
              value={user.rolId}
              onChange={handleRolChange}
            >
              {roles.map((rol) => (
                <option key={rol && rol.id} value={rol && rol.id}>
                  {rol && rol.nombre}
                </option>
              ))}
            </select>
          </div>
          {user.rolId == 1 ? (
            <div className="form-check mt-3">
              <input
                type="checkbox"
                name="is-superadmin"
                id="is-superadmin"
                className="form-check-input"
                onChange={handleIsSuperadministradorChange}
              />
              <label htmlFor="is-superadmin" className="form-check-label">
                Es superadministrador
              </label>
            </div>
          ) : null}
          {user.esSuperAdministrador ? null : (
            <div className="form-group">
              <select
                name="centroEducativo"
                id="centroEducativo"
                className="form-control"
                value={user.centroEducativoId}
                onChange={handleCentroEducativoChange}
              >
                {centrosEducativos.map((centroEducativo) => (
                  <option
                    key={centroEducativo && centroEducativo.id}
                    value={centroEducativo && centroEducativo.id}
                  >
                    {centroEducativo && centroEducativo.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="d-flex justify-content-between mt-5">
            <button
              type="button"
              className="btn btn-danger"
              onClick={props.onHide}
            >
              cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Agregar usuario
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateUserModal;
