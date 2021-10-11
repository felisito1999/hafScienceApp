import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import CreateSchoolModal from './CreateSchoolModal';
import Pagination from './Pagination';
import Card from 'react-bootstrap/Card';
import { FaSchool } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import schoolsService from '../services/schoolsService';
import { GrAdd } from 'react-icons/gr';
import SchoolDetailsModal from './SchoolDetailsModal';

const SchoolsDashboard = (props) => {
    //Variables de estado para controlar la información de los centros educativos
    const [schools, setSchools] = useState([]);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [selectedPage, setSelectedPage] = useState(1);
    const [recordsTotal, setRecordsTotal] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    //Variables de estado para manejar la muestra del estado de carga de la información
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [isDataMissing, setIsDataMissing] = useState(false);

    //Variable de estado con un objeto que maneja los parametros de búsqueda de los centros educativos.
    const [searchParameters, setSearchParameters] = useState({
        name: '',
    });

    //Variables de estado para manejar los modales de crud.
    const [isUserDetailsModalShowing, setIsUserDetailsModalShowing] =
        useState(false);
    const [isCreateModalShowing, setIsCreateModalShowing] = useState(false);

    //Función para obtener los centros educativos dependiendo de los parámetros de búscqueda que se proporcionen.
    const getSchools = async (pageNumber, pageSize) => {
        setIsDataLoading(true);

        try {
            const response = await schoolsService.getAllPaginatedSchoolsBy(
                pageNumber,
                pageSize,
                searchParameters
            );
            setSchools(response.records);
            setRecordsTotal(response.recordsTotal);
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
    const OpenSchoolDetailsModal = (schoolId) => {
        setSelectedSchoolId(schoolId);
        setIsUserDetailsModalShowing(true);
    };
    const closeSchoolDetailsModal = () => {
        setIsUserDetailsModalShowing(false);
        if (selectedPage > 1) {
            setSelectedPage(1);
            getSchools(1, pageSize);
        } else {
            getSchools(selectedPage, pageSize);
        }
    };

    const openCreateSchoolModal = () => {
        setIsCreateModalShowing(true);
    };
    const closeCreateSchoolModal = () => {
        setIsCreateModalShowing(false);
        getSchools(selectedPage, pageSize);
    };

    const handlePageChange = (selectedPage) => {
        setSelectedPage(selectedPage);
        getSchools(selectedPage, pageSize);
    };

    const handleNameChange = (e) => {
        setSearchParameters({
            ...searchParameters,
            name: e.target.value,
        });
    };

    const handleSchoolSearchSubmit = async (e) => {
        e.preventDefault();
        getSchools(1, pageSize);
        setSelectedPage(1);
    };

    useEffect(() => {
        getSchools(selectedPage, pageSize, searchParameters);
    }, []);
    return (
        <div className="component-wrapper">
            <section className="banner-bg container rounded-3 shadow py-3 my-5">
                <h1 className="banner-title text-center">Centros educativos</h1>
                <div className="d-flex justify-content-end">
                    <button
                        type="button"
                        className="btn me-2 p-1 btn-success rounded"
                        onClick={openCreateSchoolModal}
                    >
                        {/* <AgregarUsuario 
                        height={20}
                        width={20}/> */}
                        <GrAdd size={28} />
                    </button>
                </div>
                <div>
                    <form onSubmit={handleSchoolSearchSubmit}>
                        <div className="d-flex">
                            <div className="py-2 pr-2 flex-grow-1">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="form-control"
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div className="p-2">
                                <button className="btn btn-success">
                                    Buscar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                {isDataLoading ? (
                    <div className="d-flex justify-content-center mt-3">
                        <AiOutlineLoading3Quarters
                            size={50}
                            className="rotating-icon m-5"
                        />
                    </div>
                ) : isDataMissing ? (
                    <div className="d-flex justify-content-center mt-3 p-2">
                        <h3>Ha ocurrido un error, intente de nuevo</h3>
                    </div>
                ) : (
                    <>
                        <Row xs={1} md={2} className="g-2 pb-2">
                            {schools && schools.length > 0 ? (
                                schools.map((school) => (
                                    <Col key={school.id}>
                                        <Card
                                            className="pointer-cursor bg-light h-100"
                                            onClick={(e) =>
                                                OpenSchoolDetailsModal(
                                                    school.id
                                                )
                                            }
                                        >
                                            <div className="p-2 d-flex flex-row">
                                                <div className="mr-2 d-flex justify-content-center align-items-center">
                                                    <FaSchool size="50" />
                                                </div>
                                                <div className="ms-3 d-flex flex-column justify-content-start align-items-start">
                                                    <p className="fw-bold">
                                                        {school.nombre}
                                                    </p>
                                                    <p>
                                                        <span className="fw-bold">
                                                            Dirección:{' '}
                                                        </span>
                                                        {school.direccion}
                                                    </p>
                                                </div>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <div className="w-100 p-5 d-flex flex-row align-items-center justify-content-center">
                                    <h2>No se encontraron usuarios</h2>
                                </div>
                            )}
                        </Row>
                        <Pagination
                            actualPage={selectedPage}
                            recordsTotal={recordsTotal}
                            pageSize={pageSize}
                            handlePageChange={handlePageChange}
                        />
                    </>
                )}
                {isUserDetailsModalShowing ? (
                    <SchoolDetailsModal
                        show={isUserDetailsModalShowing}
                        onHide={closeSchoolDetailsModal}
                        schoolId={selectedSchoolId}
                    />
                ) : null}
                {isCreateModalShowing ? (
                    <CreateSchoolModal
                        show={isCreateModalShowing}
                        onHide={closeCreateSchoolModal}
                        dataupdate={getSchools}
                    />
                ) : null}
            </section>
        </div>
    );
};

export default SchoolsDashboard;
