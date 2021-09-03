import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal'

function EditUserModal(props) {

    const [user, setUser] = useState({
        nombres: '',
        apellidos: '',
        fechaNacimiento: '2000-01-01',
        telefono: '',
        correoElectronico: '',
        nombreUsuario: '',
        roles: {},
        estados: {},
    });
    
    const [formData, setFormData] = useState({
        roles: [],

    })

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

    const telefonoInputMask = (telephone) => {
        if (telephone.length >= 3) {
        }
    };

    const handleTelefonoChange = (e) => {
        setUser({
            ...user,
            telefono: e.target.value,
        });
    };

    const handleCorreoElectronicoChange = (e) => {
        setUser({
            ...user,
            correoElectronico: e.target.value,
        });
    };

    const handleNombreUsuarioChange = (e) => {
        setUser({
            ...user,
            nombreUsuario: e.target.value,
        });
    };

    const handleRolChange = (e) => {
        setUser({
            ...user,
            rolId: e.target.value,
        });
    };

    const handleEditUser = async () => {

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
                Ingrese los datos del nuevo usuario
            </Modal.Header>
            <Modal.Body>
                <form
                    autoComplete="off"
                    className="form"
                    onSubmit={handleEditUser}
                >
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
                            {formData && formData.roles.map((rol) => (
                                <option
                                    key={rol && rol.rolId}
                                    value={rol && rol.rolId}
                                >
                                    {rol && rol.nombreRol}
                                </option>
                            ))}
                        </select>
                        {/* <label htmlFor="rol" className="label">
                            <span className="">Nombre de usuario</span>
                        </label> */}
                        {/* <div className="underline"></div> */}
                    </div>
                    <div className="d-flex justify-content-between mt-5">
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={() => {}}
                        >
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
        </Modal>
    );
}

export default EditUserModal;