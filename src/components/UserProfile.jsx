import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import authService from '../services/authService';

const UserProfile = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const [userCredentials, setUserCredentials] = useState({
    password: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setUserCredentials({
      ...userCredentials,
      password: password,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;

    setUserCredentials({
      ...userCredentials,
      confirmPassword: confirmPassword
    });
  };

  const cleanFields = () => {
    setUserCredentials({
      ...userCredentials,
      password: '',
      confirmPassword: ''
    });
  }

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(userCredentials);
      const result = await authService.changePassword(userCredentials.password, userCredentials.confirmPassword);
      if (result) {
        alert('Se ha actualizado la contraseña exitosamente');
        cleanFields();
      }
    } catch (error) {
      alert('No se ha podido actualizar la contraseña');
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const user = await authService.getProfileInfo();
      setUserInfo(user.data);
    };

    getUserInfo();
  }, []);

  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5">
        <h1 className="banner-title text-center p-3">Perfil</h1>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <p className="fw-bold">Nombre Completo</p>
          <p>
            {userInfo && userInfo.nombres} {userInfo && userInfo.apellidos}
          </p>
          <p className="fw-bold">Nombre de usuario</p>
          <p>{userInfo && userInfo.nombreUsuario}</p>
          <p className="fw-bold">Rol</p>
          <p>{userInfo && userInfo.nombreRol}</p>
          <p className="fw-bold">Fecha de nacimiento</p>
          <p>
            {userInfo && userInfo.fechaNacimiento
              ? format(
                  Date.parse(userInfo && userInfo.fechaNacimiento),
                  'PPP',
                  {
                    locale: es,
                  }
                )
              : '01-01-2000'}
          </p>
          <p className="fw-bold">Número de teléfono</p>
          <p>{userInfo && userInfo.telefono}</p>
          <p className="fw-bold">Correo electrónico</p>
          <p>{userInfo && userInfo.correoElectronico}</p>
          <p className="fw-bold">Centro educativo</p>
          <p>{userInfo && userInfo.nombreCentroEducativo}</p>
          {/* Agregar la parte de la fecha de ingreso en el sistema */}
        </div>
        <hr />
        <div className="d-flex justify-content-center">
        <article className="form-container">
          <form className="form" onSubmit={handlePasswordChangeSubmit}>
            <h1>Cambia tu contraseña</h1>
            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                minLength="6"
                maxLength="30"
                value={userCredentials.password}
                onChange={handlePasswordChange}
                required
              />
              <label htmlFor="password" className="label-top">
                <span className="label-content">Contraseña</span>
              </label>
              <div className="underline"></div>
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                autoComplete="off"
                minLength="6"
                maxLength="30"
                value={userCredentials.confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <label htmlFor="username" className="label-top">
                <span className="label-content">Confirmar contraseña</span>
              </label>
              <div className="underline"></div>
            </div>
            <button className="mt-5 w-100 btn btn-success" type="submit">
              Cambiar contraseña
            </button>
          </form>
        </article>
        </div>
      </section>
    </div>
  );
};

export default UserProfile;
