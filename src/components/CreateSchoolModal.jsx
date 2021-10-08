import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import schoolsService from '../services/schoolsService';

const CreateSchoolModal = (props) => {
    const [school, setSchool] = useState({
        nombre: '',
        direccion: '',
    });

    const saveSchool = async (e) => {
        e.preventDefault(); 

        try {
            const response = await schoolsService.saveSchool(school);

            if (response.status === 200) {
                alert('Se ha agregado el centro educativo exitosamente')
            }
        } catch (error) {
            console.log(error);

            alert('No se ha podido completar la solicitud');
        }
    }

    const handleNombreChange = (e) => {
        e.preventDefault();

        setSchool({
            ...school,
            nombre: e.target.value,
        });
    };

    const handleDireccionChange = (e) => {
        e.preventDefault();

        setSchool({
            ...school,
            direccion: e.target.value,
        });
    };

    const handleSchoolSubmit = (e) => {
        e.preventDefault();

        saveSchool(school);
        props.onHide();
    }
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="fw-bold text-center" closeButton>
                Ingrese los datos de la nueva escuela
            </Modal.Header>
            <Modal.Body>
                <form
                    autoComplete="off"
                    className="form"
                    onSubmit={handleNewUserSubmit}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            value={school.nombres}
                            autoComplete="off"
                            minLength="2"
                            maxLength="25"
                            onChange={handleNombreChange}
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
                            minLength="2"
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
                            <span className="label-content">
                                Fecha de nacimiento
                            </span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            name="telefono"
                            id="telefono"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            value={user.telefono}
                            onChange={handleTelefonoChange}
                            required
                        />
                        <label htmlFor="telefono" className="">
                            <span className="label-content">Telefono</span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            minLength="6"
                            maxLength="254"
                            value={user.correoElectronico}
                            onChange={handleCorreoElectronicoChange}
                            required
                        />
                        <label htmlFor="email" className="">
                            <span className="label-content">
                                Correo electronico
                            </span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={user.nombreUsuario}
                            onChange={handleNombreUsuarioChange}
                            required
                        />
                        <label htmlFor="username" className="">
                            <span className="label-content">
                                Nombre de usuario
                            </span>
                        </label>
                        <div className="underline"></div>
                    </div>
                    <div className="form-group">
                        <select
                            className="form-control"
                            name="rol"
                            id="rol"
                            onChange={handleRolChange}
                        >
                            {roles.map((rol) => (
                                <option
                                    key={rol && rol.id}
                                    value={rol && rol.id}
                                >
                                    {rol && rol.nombre}
                                </option>
                            ))}
                        </select>
                        {/* <label htmlFor="rol" className="label">
                        <span className="">Nombre de usuario</span>
                    </label> */}
                        {/* <div className="underline"></div> */}
                    </div>
                    <div className="form-group">
                        <select
                            name="centroEducativo"
                            id="centroEducativo"
                            className="form-control"
                            onChange={handleCentroEducativoChange}
                        >
                            {centrosEducativos.map((centroEducativo) => (
                                <option
                                    key={centroEducativo && centroEducativo.id}
                                    value={
                                        centroEducativo && centroEducativo.id
                                    }
                                >
                                    {centroEducativo && centroEducativo.nombre}
                                </option>
                            ))}
                        </select>
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
                            Agregar usuario
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateSchoolModal;
