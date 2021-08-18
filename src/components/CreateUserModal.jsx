import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

function CreateUserModal(props) {
    const [user, setUser] = useState({
        nombres: '',
        apellidos: '',
        fechaNacimiento: '2000-01-01',
        telefono: ''
    });

    const handleNombresChange = (e) => {
        setUser({
            ...user,
            nombres: e.target.value,
        });
    };

    const handleApellidosChange = (e) => {
        setUser({
            ...user,
            apellidos: e.target.value,
        });
    };

    const handleFechaNacimientoChange = (e) => {
        setUser({
            ...user,
            fechaNacimiento: e.target.value,
        });
    };

    const telefonoInputMask = () => {
        
    }

    const handleTelefonoChange = (e) => {
        
        setUser({
            ...user,
            telefono: e.target.value
        })
    }

    const handleNewUserSubmit = async (e) => {
        e.preventDefault();
        const data = user;

        const config = {
            url: `Laparamusical`,
            method: 'post',
            headers: {},
            body: data,
        };

        const response = await axios.post(config);
    };

    useEffect(() => {
        console.log(user);
    }, [user]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="fw-bold text-center" closeButton>
                Ingrese los datos del nuevo usuario
            </Modal.Header>
            <Modal.Body>
                <form autoComplete="off" className="form">
                    <div className="form-group">
                        <input
                            type="text"
                            name="nombres"
                            id="nombres"
                            value={user.nombres}
                            autoComplete="off"
                            minLength="6"
                            maxLength="25"
                            onChange={handleNombresChange}
                            required
                        />
                        <label htmlFor="nombres" className="label-top">
                            <span className="label-content">Nombres</span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="apellidos"
                            id="apellidos"
                            autoComplete="off"
                            minLength="6"
                            maxLength="25"
                            onChange={handleApellidosChange}
                            required
                        />
                        <label htmlFor="apellidos" className="label-top">
                            <span className="label-content">Apellidos</span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            name="fecha-nacimiento"
                            id="fecha-nacimiento"
                            value={user.fechaNacimiento}
                            onChange={handleFechaNacimientoChange}
                            required
                        />
                        <label htmlFor="fecha-nacimiento" className="">
                            <span className="label-content">Fecha de nacimiento</span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            name="telefono"
                            id="telefono"
                            value={user.telefono}
                            onChange={handleTelefonoChange}
                            required
                        />
                        <label htmlFor="telefono" className="">
                            <span className="label-content">Telefono</span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <button className="btn btn-success" onClick={() => {}}>
                            Agregar usuario
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={props.onHide}
                        >
                            cancelar
                        </button>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className="d-flex flex-row justify-content-center"></Modal.Footer>
        </Modal>
    );
}

export default CreateUserModal;
