import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoSchool } from 'react-icons/io5';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from './Pagination';
import sessionsService from '../services/sessionsService';
import LoadingIcon from './LoadingIcon';
import MissingData from './MissingData';
import { FaSadTear } from 'react-icons/fa';

const StudentsSessionsDashboard = (props) => {
  const host = process.env.REACT_APP_HOST_NAME;
  const history = useHistory();

  //Variables de estado para controlar la información que viene de
  const [sessions, setSessions] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [recordsTotal, setRecordsTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  //Variables de estado para manejar la muestra del estado de carga de la información
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isDataMissing, setIsDataMissing] = useState(false);

  //Variable de estado con un objeto que maneja los parametros de búsqueda de las sesiones.
  const [searchParameters, setSearchParameters] = useState({
    name: '',
  });

  //Función para obtener los usuarios dependiendo de los parámetros de búscqueda que se proporcionen.
  const getSessions = async (pageNumber, pageSize) => {
    setIsDataLoading(true);

    try {
      const response = await sessionsService.getPaginatedTeacherSessionsBy(
        pageNumber,
        pageSize,
        searchParameters
      );
      if (response) {
        console.log(response.data);
        setSessions(response.data.records);
        setRecordsTotal(response.data.recordsTotal);
      }

      setIsDataLoading(false);
      if (isDataMissing) {
        setIsDataMissing(false);
      }
    } catch (error) {
      setIsDataLoading(false);
      setIsDataMissing(true);
    }
  };

  //Declaración de las funciones para el menejo de las variables de estado.
  const handlePageChange = (selectedPage) => {
    setSelectedPage(selectedPage);
    getSessions(selectedPage, pageSize);
  };

  const goToSessionDetail = (sessionId) => {
    history.push(`${host}est-sesiones/${sessionId}`);
  };

  const handleNameChange = (e) => {
    setSearchParameters({
      ...searchParameters,
      name: e.target.value,
    });
  };

  const handleSessionSearchSubmit = (e) => {
    e.preventDefault();
    getSessions(1, pageSize);
    setSelectedPage(1);
  };

  // useEffect(() => {
  //   getSessions(selectedPage, pageSize);
  // }, []);

  useEffect(() => {
    getSessions(selectedPage, pageSize);
  }, [props.location]);

  return (
    <>
      <div className="component-wrapper">
        <section className="banner-bg container rounded-3 shadow py-3 my-5">
          <h1 className="banner-title text-center">
            <span>
              <IoSchool />
            </span>{' '}
            Mis sesiones
          </h1>
          {isDataLoading ? (
            <LoadingIcon />
          ) : isDataMissing ? (
            <MissingData />
          ) : (
            <>
              {sessions && sessions.length > 0 ? (
                <>
                  <div className="my-3">
                    <Row xs={1} md={2} className="g-2 pb-2">
                      {sessions.map((session) => (
                        <Col key={session.id}>
                          <Card
                            className="bg-light h-100"
                            onClick={(e) => {
                              e.preventDefault();
                              goToSessionDetail(session.id);
                            }}
                          >
                            <div className="p-2 d-flex flex-row">
                              <div className="pointer-cursor mr-2 d-flex justify-content-center align-items-center">
                                <IoSchool size={40} />
                              </div>
                              <div className="pointer-cursor ms-3 d-flex flex-column flex-grow-1 justify-content-start align-items-start">
                                <p className="fw-bold">
                                  {session.nombre} {session.apellidos}
                                </p>
                                <p>
                                  <span className="fw-bold">Descripción: </span>
                                  {session.descripcion}
                                </p>
                                <p>
                                  <span className="fw-bold">Profesor: </span>
                                  {session.profesor}
                                </p>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                  <Pagination
                    actualPage={selectedPage}
                    recordsTotal={recordsTotal}
                    pageSize={pageSize}
                    handlePageChange={handlePageChange}
                  />
                </>
              ) : (
                <div className="w-100 p-5 text-center">
                  <FaSadTear size={100} />
                  <h2 className="mt-2">
                    No se encontraron sesiones a las que pertenezcas
                  </h2>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default StudentsSessionsDashboard;
