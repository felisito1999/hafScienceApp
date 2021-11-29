import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import testsService from '../services/testsService';
import Pagination from '../components/Pagination';

const AssignTestToSessionModal = (props) => {
  const today = new Date();
  const nextDay = today.setDate(today.getDate() + 1);

  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recordsTotal, setRecordsTotal] = useState(0);

  const [assignmentInfo, setAssignmnetInfo] = useState({
    sessionId: props.sessionId,
    pruebaDiagnosticaId: 1,
    fechaInicio: today,
    fechaLimite: today,
  });

  const [pruebasDiagnosticas, setPruebasDiagnosticas] = useState([]);

  const getTests = async (page, pageSize) => {
    const testsResponse = await testsService.getMyTests(page, pageSize);

    if (testsResponse) {
      console.log(testsResponse);
      setPruebasDiagnosticas(testsResponse.data.records);
      setRecordsTotal(testsResponse.data.recordsTotal);
    }
  };
  const handlePageChange = (selectedPage) => {
    setSelectedPage(selectedPage);
    testsService.getMyTest(selectedPage, pageSize);
  };

  const handlePruebaAddClick = (pruebaDiagnosticaId) => {
    setAssignmnetInfo({
    ...assignmentInfo,
    pruebaDiagnosticaId: pruebaDiagnosticaId
  });
  
    props.onSelecting(assignmentInfo);
  };

  useEffect(() => {
    const init = async () => {
      await getTests(selectedPage, pageSize);
    };
    console.log(assignmentInfo);
    init();
  }, []);
  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Body>
        {pruebasDiagnosticas &&
          pruebasDiagnosticas.map((pruebaDiagnostica, index) => (
            <Card
              key={index}
              className="mb-2 pointer-cursor bg-light h-100"
              onClick={(e) => {
                e.preventDefault();
                handlePruebaAddClick(pruebaDiagnostica.id);
              }}
            >
              <Card.Body>
                <h6 className="fw-bold">{pruebaDiagnostica.titulo}</h6>
              </Card.Body>
            </Card>
          ))}
        <Pagination
          actualPage={selectedPage}
          recordsTotal={recordsTotal}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
        />
      </Modal.Body>
    </Modal>
  );
};

export default AssignTestToSessionModal;
