import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router';
import validationService from '../services/validationService';
import authService from '../services/authService';
import Navbar from 'react-bootstrap/Navbar';
import { ReactComponent as HafIcon } from '../images/tabla-periodica.svg';
import { Switch, Route, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import LoadingIcon from './LoadingIcon';
import ResetPasswordForm from './ResetPasswordForm';

const ResetPassword = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [emailIsLoading, setEmailIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isCaptchaValid, setIsCaptchaValid] = useState(null);
  const [isSendingMail, setIsSendingMail] = useState(false);
  const [isMailSent, setIsMailSent] = useState(false);
  const [redirectCounter, setRedirectCounter] = useState(5);

  const captcha = useRef(null);
  const siteKey = process.env.REACT_APP_CAPTCHA_KEY;

  let emailChangeTimer;

  const handleEmailChange = async (e) => {
    const emailValue = e.target.value;

    emailChangeTimer = setTimeout(async () => {
      try {
        const emailExists = await authService.confirmResetPasswordEmail(
          emailValue
        );
        if (emailExists) {
          setIsEmailValid(true);
        } else {
          setIsEmailValid(false);
        }
      } catch (error) {
        if (error.response.data) {
          setIsEmailValid(false);
        }
      }
    }, 1500);

    setEmail(emailValue);
  };

  const handleCaptchaChange = () => {
    if (captcha.current.getValue()) {
      setIsCaptchaValid(true);
    }
  };

  const checkAreFieldsValid = () => {
    if (
      !validationService.isNullOrWhiteSpace(email) &&
      captcha.current.getValue()
    ) {
      return true;
    }

    if (!captcha.current.getValue()) {
      setIsCaptchaValid(false);
    }
    return false;
  };

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      if (checkAreFieldsValid()) {
        const result = await authService.confirmResetPasswordEmail(email);
        console.log(result);
        if (result.data) {
          setIsSendingMail(true);
          const confirmData = await authService.resetPasswordRequest(email);
          setIsSendingMail(false);
          setIsMailSent(true);
          if (confirmData.data) {
            // setIsSent();
          }
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isMailSent) {
      const timer =
        redirectCounter >= 0 &&
        setInterval(() => {
          if (redirectCounter == 0) {
            history.push(host);
          }
          setRedirectCounter(redirectCounter - 1);
        }, 1000);
      return () => clearInterval(timer);
    }
  }, [redirectCounter, isMailSent]);

  return (
    <div>
      <div>
        <Navbar
          id="landing-page-navbar"
          className="px-4 w-100"
          collapseOnSelect
          expand="lg"
          variant="light"
        >
          <Link to={`${host}`} className="navbar-brand">
            <HafIcon
              className="d-inline-block align-top"
              width="40"
              height="40"
            />
            <span className="fw-bold text-light">HAF Science</span>
          </Link>
        </Navbar>
        <div className="d-flex justify-content-center">
          <div className="form-container">
            <Switch>
              <Route exact path={`${host}reset-password`}>
                {isMailSent ? (
                  <div className="text-center py-5">
                    <h3>
                      Revise su correo y siga los pasos para recuperar su
                      contraseña
                    </h3>
                    <p>
                      Serás redirigido a la pagina principal en{' '}
                      {redirectCounter} segundos
                    </p>
                    <LoadingIcon />
                  </div>
                ) : isSendingMail ? (
                  <LoadingIcon />
                ) : (
                  <>
                    <h1>Recuperación de contraseña</h1>

                    <form className="form" onSubmit={onEmailSubmit}>
                      <p>
                        Ingrese el correo de la cuenta a la que desea recuperar
                        la contraseña
                      </p>
                      {isEmailValid === false ? (
                        <p className="text-danger">Este correo no es valido</p>
                      ) : null}
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="off"
                          minLength="6"
                          maxLength="254"
                          onChange={handleEmailChange}
                          required
                        />
                        <label htmlFor="email" className="label-top">
                          <span className="label-content">
                            Correo electronico
                          </span>
                        </label>
                        <div className="underline"></div>
                      </div>
                      <div className="recaptcha pt-3 d-flex flex-column align-items-center">
                        {isCaptchaValid === false ? (
                          <div>
                            <p className="text-danger">
                              Por favor, realice la verificación del captcha
                              correctamente
                            </p>
                          </div>
                        ) : null}
                        <ReCAPTCHA
                          ref={captcha}
                          sitekey={siteKey}
                          onChange={handleCaptchaChange}
                        />
                      </div>
                      <button
                        className="w-100 btn btn-success mt-3"
                        type="submit"
                      >
                        Enviar correo de recuperación
                      </button>
                    </form>
                  </>
                )}
              </Route>
              <Route exact path={`${host}reset-password/:userCode`} component={ResetPasswordForm}>
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
