import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import testsService from '../services/testsService';
import Pagination from '../components/Pagination';
import LoadingIcon from './LoadingIcon';
import DateTimePicker from 'react-datetime-picker';
import { AiFillCheckCircle } from 'react-icons/ai';
import { toDate, weeksToDays } from 'date-fns';

const AssignTestToSessionModal = (props) => {
  let today = new Date();
  const fechaInicioMinDateTime = new Date();
  const fechaLimiteMinDateTime = new Date();

  fechaLimiteMinDateTime.setHours(today.getHours() + 1);
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [areTestsLoading, setAreTestsLoading] = useState(true);
  const [areTestsNotFound, setAreTestsNotFound] = useState(false);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);

  //const oneHourLater = today.setHours(today.getHours + 1)

  const [assignmentInfo, setAssignmentInfo] = useState({
    sessionId: props.sessionId,
    pruebaDiagnosticaId: null,
    fechaInicio: fechaInicioMinDateTime,
    fechaLimite: fechaLimiteMinDateTime,
    duracionMinutos: 15,
    cantidadIntentos: 1
  });

  const [pruebasDiagnosticas, setPruebasDiagnosticas] = useState([]);

  const getTests = async (page, pageSize) => {
    try {
      const testsResponse = await testsService.getMyTests(page, pageSize);

      if (testsResponse) {
        setPruebasDiagnosticas(testsResponse.data.records);
        setRecordsTotal(testsResponse.data.recordsTotal);

        if (!testsResponse.data.recordsTotal > 0) {
          setAreTestsNotFound(true);
        }
      }
    } catch (error) {
      console.log(error);
      setAreTestsNotFound(true);
    }
  };
  const handlePageChange = (selectedPage) => {
    setSelectedPage(selectedPage);
    testsService.getMyTest(selectedPage, pageSize);
    setSelectedTestIndex(null);
  };

  const handleFechaInicioChange = (value) => {
    setAssignmentInfo({
      ...assignmentInfo,
      fechaInicio: value,
    });
  };

  const handleFechaLimiteChange = (value) => {
    setAssignmentInfo({
      ...assignmentInfo,
      fechaLimite: value,
    });
  };

  const handleDuracionChange = (e) => {
    const duracion = e.target.value;

    setAssignmentInfo({
      ...assignmentInfo,
      duracionMinutos: duracion,
    });
  };

  const handleIntentosChange = (e) => {
    const cantidadIntentos = e.target.value; 

    setAssignmentInfo({
      ...assignmentInfo, 
      cantidadIntentos: cantidadIntentos
    })
  }

  const handlePruebaAddClick = (pruebaDiagnosticaId, index) => {
    setSelectedTestIndex(index);
    setAssignmentInfo({
      ...assignmentInfo,
      pruebaDiagnosticaId: pruebaDiagnosticaId,
    });
    //props.onSelecting(pruebaDiagnosticaId);
  };

  const isTestAssignmentValid = () => {
    const errorMessages = [];

    if (
      !assignmentInfo.pruebaDiagnosticaId ||
      assignmentInfo.pruebaDiagnosticaId === 0
    ) {
      errorMessages.push('Debe seleccionar una prueba diagnostica.');
    }

    if (
      Object.prototype.toString.call(assignmentInfo.fechaInicio) ===
      '[object Date]'
    ) {
      if (isNaN(assignmentInfo.fechaInicio.getTime())) {
        errorMessages.push('Especifique una fecha de inicio válida.');
      } else {
        if (assignmentInfo.fechaInicio >= assignmentInfo.fechaLimite) {
          errorMessages.push(
            'La fecha de inicio debe ser menor a la fecha limite.'
          );
        }
      }
    }
    if (
      Object.prototype.toString.call(assignmentInfo.fechaLimite) ===
      '[object Date]'
    ) {
      if (isNaN(assignmentInfo.fechaLimite.getTime())) {
        errorMessages.push('Especifique una fecha de inicio válida.');
      } else {
        if (assignmentInfo.fechaLimite <= assignmentInfo.fechaInicio) {
          errorMessages.push(
            'La fecha límite debe ser mayor a la fecha de inicio.'
          );
        }
      }
    }

    if (errorMessages.length > 0) {
      alert(
        'No se puede asignar la prueba, revise lo siguiente:\n' +
        errorMessages.map((message) => '- ' + message + '\n').join('')
      );
      return false;
    }
    return true;
  };

  const handleTestAssignment = () => {
    console.log(assignmentInfo);

    if (isTestAssignmentValid()){
      setAreTestsLoading(true);
      props.onSelecting(assignmentInfo);
      setAreTestsLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      console.log(fechaLimiteMinDateTime);
      await getTests(selectedPage, pageSize);
      setAreTestsLoading(false);
    };
    init();
  }, []);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header className="fw-bold" closeButton>
        <Modal.Title>Asignar prueba</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {areTestsLoading ? (
          <LoadingIcon />
        ) : areTestsNotFound ? (
          <p className="text-center">
            No se han encontrado pruebas registradas
          </p>
        ) : (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleTestAssignment();
              }}
            >
              <div className="mb-3">
                <label>Fecha de inicio</label>
                <DateTimePicker
                  className="form-control"
                  minDate={fechaInicioMinDateTime}
                  format="dd/MM/yyyy HH:mm"
                  value={assignmentInfo.fechaInicio}
                  onChange={handleFechaInicioChange}
                />
              </div>
              <div className="mb-3">
                <label>Fecha límite</label>
                <DateTimePicker
                  className="form-control"
                  minDate={fechaLimiteMinDateTime}
                  format="dd/MM/yyyy HH:mm"
                  value={assignmentInfo.fechaLimite}
                  onChange={handleFechaLimiteChange}
                />
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  value={assignmentInfo.duracionMinutos}
                  onChange={handleDuracionChange}
                  name="duracion"
                  id="duracion"
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={45}>45 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={75}>1 hora y 15 minutos</option>
                  <option value={90}>1 hora y 30 minutos</option>
                  <option value={75}>1 hora y 45 minutos</option>
                  <option value={120}>2 horas</option>
                </select>
                <label htmlFor="duracion">Tiempo de realización</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  value={assignmentInfo.cantidadIntentos}
                  onChange={handleIntentosChange}
                  name="intentos"
                  id="intentos"
                >
                  <option value={1}>1 intento</option>
                  <option value={2}>2 intentos</option>
                  <option value={3}>3 intentos</option>
                </select>
                <label htmlFor="intentos">Cantidad de intentos</label>
              </div>
              <div className="mb-3">
                <button className="w-100 btn btn-success">
                  Añadir prueba a sesión
                </button>
              </div>
              <div className="mb-3">
                {pruebasDiagnosticas &&
                  pruebasDiagnosticas.map((pruebaDiagnostica, index) => (
                    <Card
                      key={index}
                      className={`mb-1 pointer-cursor ${
                        selectedTestIndex === index
                          ? 'bg-light fw-bold border-success border-2'
                          : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePruebaAddClick(pruebaDiagnostica.id, index);
                      }}
                    >
                      <Card.Body>
                        <p className="text-center align-middle">
                          {pruebaDiagnostica.titulo}
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
              <Pagination
                actualPage={selectedPage}
                recordsTotal={recordsTotal}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
              />
            </form>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AssignTestToSessionModal;
