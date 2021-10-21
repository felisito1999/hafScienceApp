import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import sessionsService from '../services/sessionsService';

const CreateSessionModal = (props) => {
    const [session, setSession] = useState({
        nombre: '',
        descripcion: '',
        centroEducativoId: 0,
    });
    const handleSessionSubmit = async (session) => {
        const response = await sessionsService.saveSession(session);
        console.log(response);
    };

    const handleNombreChange = (e) => {
        setSession({
            ...session,
            nombre: e.target.value,
        });
    };

    const handleDescripcionChange = (e) => {
        setSession({
            ...session,
            descripcion: e.target.value,
        });
    };
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="fw-bold text-center" closeButton>
                Ingrese los datos de la nueva sesión
            </Modal.Header>
            <Modal.Body>
                <form
                    autoComplete="off"
                    className="form"
                    onSubmit={handleSessionSubmit}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={session.nombre}
                            autoComplete="off"
                            minLength="2"
                            maxLength="50"
                            onChange={handleNombreChange}
                            required
                        />
                        <label htmlFor="nombres" className="label-top">
                            <span className="label-content">Nombre de sesión</span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group mt-5">
                        <label htmlFor="direccion" className="form-label mb-4">
                            <span>Descripción</span>
                        </label>
                        <textarea
                            type="text"
                            name="direccion"
                            id="direccion"
                            className="form-control"
                            autoComplete="off"
                            minLength="25"
                            maxLength="128"
                            rows="2"
                            onChange={handleDescripcionChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mt5">
                        
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={props.onHide}
                        >
                            cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => {}}
                        >
                            Agregar sesión
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateSessionModal;
