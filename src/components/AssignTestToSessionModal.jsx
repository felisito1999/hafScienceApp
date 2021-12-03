import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import testsService from '../services/testsService';
import Pagination from '../components/Pagination';
import LoadingIcon from './LoadingIcon';
import DateTimePicker from 'react-datetime-picker';
import { AiFillCheckCircle } from 'react-icons/ai';

const AssignTestToSessionModal = (props) => {
  const today = new Date();
  const nextDay = today.setDate(today.getDate() + 1);

  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [areTestsLoading, setAreTestsLoading] = useState(true);
  const [areTestsNotFound, setAreTestsNotFound] = useState(false);
  const [selectedTestIndex, setSelectedTestIndex] = useState(null);

  const [assignmentInfo, setAssignmentInfo] = useState({
    sessionId: props.sessionId,
    pruebaDiagnosticaId: null,
    fechaInicio: today,
    fechaLimite: today,
  });

  const [pruebasDiagnosticas, setPruebasDiagnosticas] = useState([]);

  const getTests = async (page, pageSize) => {
    const testsResponse = await testsService.getMyTests(page, pageSize);

    if (testsResponse) {
      setPruebasDiagnosticas(testsResponse.data.records);
      setRecordsTotal(testsResponse.data.recordsTotal);

      if (testsResponse.data.recordsTotal === 0) {
        setAreTestsNotFound(true);
      }
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

  const handlePruebaAddClick = (pruebaDiagnosticaId, index) => {
    setSelectedTestIndex(index);
    //props.onSelecting(pruebaDiagnosticaId);
  };

  const handleTestAssignment = (assignmentInfo) => {};

  useEffect(() => {
    const init = async () => {
      await getTests(selectedPage, pageSize);
      setAreTestsLoading(false);
    };
    console.log(assignmentInfo);
    init();
  }, []);
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header className="fw-bold">Pruebas diagnósticas</Modal.Header>
      <Modal.Body>
        {areTestsLoading ? (
          <LoadingIcon />
        ) : areTestsNotFound ? (
          <p className="text-center">
            No se han encontrado pruebas registradas
          </p>
        ) : (
          <>
            <div>
              <div className="mb-3">
                <label>Fecha de inicio</label>
                <DateTimePicker
                  className="form-control"
                  format="dd/MM/yyyy HH:mm:ss"
                  value={assignmentInfo.fechaInicio}
                  onChange={handleFechaInicioChange}
                />
              </div>
              <div className="mb-3">
                <label>Fecha límite</label>
                <DateTimePicker
                  className="form-control"
                  format="dd/MM/yyyy HH:mm:ss"
                  value={assignmentInfo.fechaLimite}
                  onChange={handleFechaLimiteChange}
                />
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
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default AssignTestToSessionModal;
