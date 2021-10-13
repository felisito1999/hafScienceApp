import React, { useState } from 'react';

const UserDetails = (props) => {
    const [userInfo, setUserInfo] = useState({});

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <p className="fw-bold">Nombre Completo</p>
            <p>
                {userInfo && userInfo.nombres} {userInfo && userInfo.apellidos}
            </p>
            <p className="fw-bold">Nombre de usuario</p>
            <p>{userInfo && userInfo.nombreUsuario}</p>
            <p className="fw-bold">Rol</p>
            <p>{userInfo && userInfo.nombreRol}</p>
            <p className="fw-bold">Fecha de nacimiento</p>
            <p>
                {userInfo && userInfo.fechaNacimiento
                    ? format(Date.parse(userInfo && userInfo.fechaNacimiento), 'PPP', {
                          locale: es,
                      })
                    : '01-01-2000'}
            </p>
            <p className="fw-bold">Número de teléfono</p>
            <p>{userInfo && userInfo.telefono}</p>
            <p className="fw-bold">Correo electrónico</p>
            <p>{userInfo && userInfo.correoElectronico}</p>
            <p className="fw-bold">Centro educativo</p>
            <p>{userInfo && userInfo.nombreCentroEducativo}</p>
            {/* Agregar la parte de la fecha de ingreso en el sistema */}
        </div>
    );
};

export default UserDetails;
