import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import authService from '../services/authService';

const ResetPasswordForm = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  let { userCode } = useParams();
  const history = useHistory();

  const defaultConfirmPasswordModel = {
    password: '',
    confirmPassword: '',
  };

  const [confirmPasswordModel, setConfirmPasswordModel] = useState({
    ...defaultConfirmPasswordModel,
  });

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    setConfirmPasswordModel({
      ...confirmPasswordModel,
      password: password,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;

    setConfirmPasswordModel({
      ...confirmPasswordModel,
      confirmPassword: confirmPassword,
    });
  };

  const handleConfirmPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.saveResetPassword(
        confirmPasswordModel.password,
        confirmPasswordModel.confirmPassword,
        userCode,
      );
      alert("Se ha restaurado la contraseña exitosamente")
      history.push(host)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkUserCode = async () => {
      try {
        const result = await authService.checkIsHashValid(userCode);

        if (result.data === false) {
          alert(
            'Este link está expirado o no es válido, serás redirigido a la página principal'
          );
          history.push(host);
        }
        
      } catch (error) {
        alert("No se pudo verificar el código de usuario");
        history.push(host);
      }
    };
  });

  return (
    <>
      <h1>Escribe tu nueva contraseña</h1>
      <form
        autoComplete="off"
        className="form"
        onSubmit={handleConfirmPasswordSubmit}
      >
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="off"
            minLength="6"
            maxLength="30"
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
    </>
  );
};

export default ResetPasswordForm;
