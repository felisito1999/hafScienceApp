import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import testsService from '../services/testsService';
import LoadingIcon from './LoadingIcon';

const StartTestAttemptConfirmationModal = (props) => {
  const [testDetails, setTestDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTestInfo = async (testId, sessionId) => {
    setIsLoading(true);
    try {
      const response = await testsService.getTestDetails(testId, sessionId);

      if (response) {
        setTestDetails(response.data);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (props.testId) {
      const getInitData = async () => {
        await getTestInfo(props.testId, props.sessionId);
      };

      getInitData();
    }
    console.log('Me corrí');
  }, [props.testId, props.sessionId]);
  return (
    <Modal show={props.show} onHide={props.handleModalResult}>
      {isLoading ? (
        <LoadingIcon />
      ) : isError ? (
        <>
          <h1>Ha ocurrido un error</h1>
        </>
      ) : (
        <>
          <Modal.Header className="d-flex flex-column">
            <p className="fw-bold">
              ¿Está seguro de que desea inicar esta prueba?
            </p>
            <p><small>Una vez que inicies no se puede deshacer el intento</small></p>
          </Modal.Header>
          <Modal.Body>
            {testDetails && testDetails ? (
              <>
                <p className="fw-bold text-center">Título</p>
                <p className="text-center">{testDetails.titulo}</p>
                <p className="fw-bold text-center">Preguntas</p>
                <p className="text-center">{testDetails.cantidadPreguntas}</p>
                <p className="fw-bold text-center">Duración</p>
                <p className="text-center">{testDetails.pruebaSesion && testDetails.pruebaSesion.duracion}{' '}minutos</p>
                <p className="fw-bold text-center">Calificación</p>
                <p className="text-center">{testDetails.calificacionMaxima}{' '}pts</p>
              </>
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-danger"
              onClick={(e) => {
                e.preventDefault();
                props.handleModalResult(false);
              }}
            >
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                props.handleModalResult(true, props.testId, props.sessionId);
              }}
            >
              Continuar
            </button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

StartTestAttemptConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  testId: PropTypes.number,
  sessionId: PropTypes.number,
  handleModalResult: PropTypes.func.isRequired,
};

export default StartTestAttemptConfirmationModal;
