import React from 'react';
import Modal from 'react-bootstrap/Modal';

const ConfirmDeleteModal = (props) => {
    
    return (
        <>
            <Modal
            show={props.show}
            onHide={props.onHide}>
                <Modal.Body>
                    ¿Está seguro/a de deshabilitar este usuario?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={(e) => {
                        e.preventDefault();
                        props.onHide();
                    }}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={(e) => {
                        e.preventDefault();
                        props.handleConfirmDelete();
                        props.onHide();
                    }}>
                        Eliminar
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmDeleteModal;