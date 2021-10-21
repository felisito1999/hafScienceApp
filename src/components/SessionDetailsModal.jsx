import React, { useState, useEffect } from 'react';
import Modal  from 'react-bootstrap/Modal';
import sessionsService from '../services/sessionsService';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const SessionDetailsModal = (props) => {
    const [school, setSchool] = useState(null);
    const [updateSchool, setUpdateSchool] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleNombreChange = (e) => {
        e.preventDefault();

        setUpdateSchool({
            ...updateSchool,
            nombre: e.target.value,
        });
    };

    const handleDireccionChange = (e) => {
        e.preventDefault();

        setUpdateSchool({
            ...updateSchool,
            direccion: e.target.value,
        });
    };

    const handleOpenDelete = () => {
        setIsDeleting(true);
    };

    const handleCloseDelete = () => {
        setIsDeleting(false);
        props.onHide();
    };

    const handleDeleteSchool = async () => {
        if (isDeleting) {
            const response = await sessionsService.disableSchool(school.id);
            console.log(response);
            if (typeof(response) !== 'undefined' && response.status === 'Success') {
                props.onHide();
                alert('Se ha deshabilitado el centro educativo con éxito');
            } else {
                alert('No se ha podido deshabilitar el centro educativo');
            }
        }
    };

    const handleEnableUpdate = (e) => {
        e.preventDefault();
        setIsEditing(!isEditing);
        setUpdateSchool(school);
    };

    const handleSchoolUpdate = async (school) => {
        if (isEditing) {
            const response = await sessionsService.updateSchool(school);
            if (typeof(response) !== 'undefined' && response.status === 'Success') {
                props.onHide();
                alert('Se ha modificado el centro educativo con éxito');
            } else {
                alert('No se ha podido modificar el centro educativo');
            }
        }
    };

    useEffect(() => {
        const getInitData = async () => {
            const schoolData = await sessionsService.getById(props.schoolId);
            setSchool(schoolData);
        };

        getInitData();
    }, []);
    return (
        <>
            {isDeleting ? (
                <ConfirmDeleteModal
                    show={isDeleting}
                    onHide={handleCloseDelete}
                    object={'centro educativo'}
                    handleConfirmDelete={handleDeleteSchool}
                />
            ) : null}

            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header
                    className="fw-bold d-flex justify-content-center"
                    closeButton
                >
                    <h5 className="text-center">Informacion del centro educativo</h5>
                </Modal.Header>
                <Modal.Body>
                    <form
                        autoComplete="off"
                        className="form"
                        onSubmit={handleSchoolUpdate}
                    >
                        {isEditing ? (
                            <>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="nombre"
                                        id="nombre"
                                        value={updateSchool.nombre}
                                        autoComplete="off"
                                        minLength="2"
                                        maxLength="50"
                                        onChange={handleNombreChange}
                                        required
                                    />
                                    <label
                                        htmlFor="nombres"
                                        className="label-top"
                                    >
                                        <span className="label-content">
                                            Nombres
                                        </span>
                                    </label>
                                    <div className="underline"></div>
                                </div>
                                <div className="form-group mt-5">
                                    <label
                                        htmlFor="direccion"
                                        className="form-label mb-4"
                                    >
                                        <span>Dirección</span>
                                    </label>
                                    <textarea
                                        type="text"
                                        name="direccion"
                                        id="direccion"
                                        value={updateSchool.direccion}
                                        className="form-control"
                                        autoComplete="off"
                                        minLength="25"
                                        maxLength="128"
                                        rows="2"
                                        onChange={handleDireccionChange}
                                        required
                                    ></textarea>
                                </div>
                            </>
                        ) : (
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <p className="fw-bold">Nombre</p>
                                <p>{school && school.nombre}</p>
                                <p className="fw-bold">Dirección</p>
                                <p>{school && school.direccion}</p>
                                <p className="fw-bold">Estado del centro educativo</p>
                                <p>{school && school.nombreEstado}</p>
                                {/* Agregar la parte de la fecha de ingreso en el sistema */}
                            </div>
                        )}
                        <Modal.Footer className="d-flex justify-content-evenly mt-5">
                            <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleOpenDelete();
                                }}
                            >
                                Deshabilitar centro educativo
                            </button>
                            {isEditing ? (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleEnableUpdate}
                                >
                                    Volver a visualizar información del centro educativo
                                </button>
                            ) : null}
                            <button
                                type="submit"
                                className="btn btn-warning"
                                onClick={(e) => {
                                    if (isEditing) {
                                        e.preventDefault();
                                        handleSchoolUpdate(updateSchool);
                                    } else {
                                        handleEnableUpdate(e);
                                    }
                                }}
                            >
                                Modificar centro educativo
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default SessionDetailsModal;