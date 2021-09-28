import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';

const UserDetailsModal = (props) => {

    useEffect(() => {
        console.log(props.userData)
    }, [])
    return (
        <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header className="fw-bold d-flex justify-content-center" closeButton>
            <h6>Informacion del usuario</h6>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex justify-content-center">
                <h6>{props.userData.nombres} {props.userData.apellidos}</h6>
            </div>
        </Modal.Body>
    </Modal>
    );
}

export default UserDetailsModal;