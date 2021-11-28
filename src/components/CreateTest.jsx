import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateTimePicker from 'react-datetime-picker/dist/DateTimePicker';
import { GrAdd } from 'react-icons/gr';
import AddTestQuestionsModal from './AddTestQuestionsModal';

function CreateTest(props) {
  // const today = new Date();

  const defaultPruebaDiagnostica = {
    titulo: '',
    calificacionMaxima: 0.0,
    // fechaInicio: today,
    // fechaLimite: today.setDate(today.getDate() + 1),
    preguntas: [],
  };
  const [pruebaDiagnostica, setPruebaDiagnostica] = useState({
    ...defaultPruebaDiagnostica,
  });

  const [isQuestionsModalOpen, setIsQuestionsModalOpen] = useState(false);

  const handleTituloChange = (e) => {
    const titulo = e.target.value;

    setPruebaDiagnostica({
      pruebaDiagnostica,
      titulo: titulo,
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
    setPruebaDiagnostica({
      ...pruebaDiagnostica,
      calificacionMaxima: calificacionMaxima,
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

  const handleFechaIncioChange = (value) => {
    setPruebaDiagnostica({
      ...pruebaDiagnostica,
      fechaInicio: value,
    });
  };

  const handleFechaLimiteChange = (value) => {
    setPruebaDiagnostica({
      ...pruebaDiagnostica,
      fechaLimite: value,
    });
  };

  const handleQuestionsModalOpen = (e) => {
    if (e) {
      e.preventDefault();
    }
    
    setIsQuestionsModalOpen(!isQuestionsModalOpen);
  };

  return (
    <div className="component-wrapper">
      <div className="container bg-light rounded-3 shadow py-3 my-5">
        <h1 className="fw-bold text-center">
          Creación de pruebas diagnósticas
        </h1>
        <form autoComplete="false" className="form bg-light">
          <section id="general-test-info">
            <Row className="mb-3">
              <Col sm={10}>
                <div className="form-group">
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    value={pruebaDiagnostica.titulo}
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
                    value={pruebaDiagnostica.calificacionMaxima}
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
              {isQuestionsModalOpen ? (
                <AddTestQuestionsModal
                  show={isQuestionsModalOpen}
                  onHide={handleQuestionsModalOpen}
                />
              ) : null}
              <button
                className="btn btn-success"
                onClick={handleQuestionsModalOpen}
              >
                <GrAdd className="fw-bold" size={18} />
              </button>
            </div>

            {pruebaDiagnostica &&
              pruebaDiagnostica.preguntas.map((pregunta) => (
                <h1>Hello soy una pregunta</h1>
              ))}
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
