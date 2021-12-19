import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import AddTestQuestionsModal from './AddTestQuestionsModal';
import testsService from '../services/testsService';
import MaskedInput from 'react-text-mask';
import validationService from '../services/validationService';

function CreateTest(props) {
  // const today = new Date();
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();

  const defaultPruebaDiagnostica = {
    pruebaDiagnostica: {
      titulo: '',
      calificacionMaxima: 0.0,
    },
    preguntas: [],
  };
  const [pruebaDiagnostica, setPruebaDiagnostica] = useState({
    ...defaultPruebaDiagnostica,
  });

  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);

  const handleTituloChange = (e) => {
    const titulo = e.target.value;
    const pruebaDiagnosticaValue = pruebaDiagnostica.pruebaDiagnostica;
    pruebaDiagnosticaValue.titulo = titulo;

    setPruebaDiagnostica({
      ...pruebaDiagnostica,
      pruebaDiagnostica: pruebaDiagnosticaValue,
    });
  };

  const handleCalificacionMaximaChange = (e) => {
    let calificacionMaxima = e.target.value;

    if (calificacionMaxima > 100) {
      calificacionMaxima = 100.0;
    }

    if (calificacionMaxima <= 0) {
      calificacionMaxima = 0.0;
    }

    const pruebaDiagnositcaValue = pruebaDiagnostica.pruebaDiagnostica;
    pruebaDiagnositcaValue.calificacionMaxima = calificacionMaxima;

    setPruebaDiagnostica({
      ...pruebaDiagnostica,
      pruebaDiagnostica: pruebaDiagnositcaValue,
    });
  };

  const formatCalificacionMaxima = (e) => {
    const calificacionMaxima = e.target.value;

    if (calificacionMaxima) {
      const formattedCalificacionMaxima =
        parseFloat(calificacionMaxima).toFixed(2);
      setPruebaDiagnostica({
        ...pruebaDiagnostica,
        calificacionMaxima: formattedCalificacionMaxima,
      });
    }
  };

  const addSelectedQuestion = (question) => {
    if (question) {
      if (
        pruebaDiagnostica.preguntas.filter(
          (pregunta) => pregunta.titulo === question.titulo
        ).length > 0
      ) {
        alert('Esta pregunta ya se encuentra agregada a la prueba');
        return;
      }

      var existingQuestions = pruebaDiagnostica.preguntas;
      existingQuestions.push(question);

      setPruebaDiagnostica({
        ...pruebaDiagnostica,
        preguntas: existingQuestions,
      });

      console.log(question);

      handleQuestionsModalOpen();
    }
  };

  const handleQuestionsModalOpen = (e) => {
    if (e) {
      e.preventDefault();
    }

    setIsQuestionsModalOpen(!isQuestionsModalOpen);
  };

  const validateTest = () => {
    if (Array.isArray(pruebaDiagnostica.preguntas)) {
      if (pruebaDiagnostica.preguntas.length > 0) {
        if (
          validationService.isNullOrWhiteSpace(
            pruebaDiagnostica.pruebaDiagnostica.titulo
          )
        ) {
          alert('La prueba diagnóstica debe poseer un título válido');
          return false;
        }
        if (pruebaDiagnostica.pruebaDiagnostica.calificacionMaxima > 0 && pruebaDiagnostica.pruebaDiagnostica.calificacionMaxima <= 100){
          return true;
        }
        else {
          alert('La calificación máxima de la prueba diagnóstica debe estar entre 0 y 100 puntos');
          return false;
        }
        return true;
      } else {
        alert('La prueba diagnóstica debe tener al menos una pregunta');
        return false;
      }
    } else {
      alert('Ha ocurrido un error y no se pudo guardar la prueba diagnóstica');
      return false;
    }
  };

  const submitTest = async (pruebaDiagnostica) => {
    if (validateTest() === true) {
      try {
        const result = await testsService.savePruebaDiagnostica(
          pruebaDiagnostica
        );

        if (result) {
          alert('La prueba diagnóstica ha sido guardada exitosamente.');
          history.push(`${host}prof-sesiones`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="component-wrapper">
      {isQuestionsModalOpen ? (
        <AddTestQuestionsModal
          show={isQuestionsModalOpen}
          onQuestionSelected={addSelectedQuestion}
          onHide={handleQuestionsModalOpen}
        />
      ) : null}
      <div className="container bg-light rounded-3 shadow py-3 my-5">
        <h1 className="fw-bold text-center">
          Creación de pruebas diagnósticas
        </h1>
        <form
          autoComplete="false"
          onSubmit={(e) => {
            e.preventDefault();
            submitTest(pruebaDiagnostica);
          }}
          className="form bg-light"
        >
          <section id="general-test-info">
            <Row className="mb-3">
              <Col sm={10}>
                <div className="form-group">
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    value={pruebaDiagnostica.pruebaDiagnostica.titulo}
                    autoComplete="off"
                    minLength="2"
                    maxLength="50"
                    onChange={handleTituloChange}
                    required
                  />
                  <label htmlFor="titulo" className="label-top">
                    <span className="label-content">Título</span>
                  </label>
                  <div className="underline"></div>
                </div>
              </Col>
              <Col sm={2}>
                <div className="form-group">
                  <input
                    type="number"
                    name="calificacion-maxima"
                    id="calificacion-maxima"
                    value={
                      pruebaDiagnostica.pruebaDiagnostica.calificacionMaxima
                    }
                    autoComplete="off"
                    min="0.00"
                    max="100.00"
                    onChange={handleCalificacionMaximaChange}
                    onBlur={formatCalificacionMaxima}
                    required
                  />
                  <label htmlFor="titulo" className="label-top">
                    <span className="label-content">Calificación</span>
                  </label>
                  <div className="underline"></div>
                </div>
              </Col>
            </Row>
            <button className="w-100 btn btn-success" type="submit">
              Crear prueba diagnóstica
            </button>
            {/* <Row className="mb-3">
              <Col sm={6}>
                <div>
                  <label className="form-label" htmlFor="fecha-inicio">
                    Fecha inicio
                  </label>
                  <DateTimePicker
                    id="fecha-inicio"
                    value={pruebaDiagnostica.fechaInicio}
                    minDate={today}
                    onChange={handleFechaIncioChange}
                    format="dd-MM-y HH:mm:ss"
                    className="form-control"
                    required
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div>
                  <label className="form-label" htmlFor="fecha-limite">
                    Fecha límite
                  </label>
                  <DateTimePicker
                    id="fecha-limite"
                    value={pruebaDiagnostica.fechaLimite}
                    minDate={today}
                    onChange={handleFechaIncioChange}
                    format="dd-MM-y HH:mm:ss"
                    className="form-control"
                    required
                  />
                </div>
              </Col>
            </Row> */}
          </section>
          <section id="test-questions">
            <div className="my-5 d-flex flex-row">
              <h3 className="flex-grow-1 fw-bold">Preguntas</h3>
              <button
                className="btn btn-success"
                onClick={handleQuestionsModalOpen}
              >
                Añadir pregunta
              </button>
            </div>
            <Accordion
              className="mb-5"
              defaultActiveKey="questions" /*{registeredQuestions[0].id}*/
            >
              {pruebaDiagnostica &&
                pruebaDiagnostica.preguntas &&
                pruebaDiagnostica.preguntas.map((question, index) => (
                  <Accordion.Item key={index} eventKey={'questions'}>
                    <Accordion.Header>{question.titulo}</Accordion.Header>
                    <Accordion.Body>
                      {question.respuesta &&
                        question.respuesta.map((respuesta, index) => (
                          <div key={index} className="input-group mb-3">
                            <span
                              className="input-group-text pointer-cursor"
                              id={`Respuesta${index}`}
                            >
                              {respuesta.esCorrecta ? (
                                <AiFillCheckCircle
                                  className="cursor-pointer text-success"
                                  size={25}
                                />
                              ) : (
                                <AiFillCloseCircle
                                  className="text-danger"
                                  size={25}
                                />
                              )}
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={respuesta.contenido}
                              aria-label="Username"
                              aria-describedby={`Respuesta${index}`}
                              disabled
                            />
                          </div>
                        ))}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
            </Accordion>
          </section>
          <button className="w-100 btn btn-success" type="submit">
            Crear prueba diagnóstica
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTest;
