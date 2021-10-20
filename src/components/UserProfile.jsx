import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import authService from '../services/authService';

const UserProfile = (props) => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await authService.getProfileInfo();
            setUserInfo(user.data);
        };

        getUserInfo();
    }, []);

    return (
        <div className="component-wrapper">
            <section className="banner-bg container rounded-3 shadow py-3 my-5">
                <h1 className="banner-title text-center p-3">Perfil</h1>
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <p className="fw-bold">Nombre Completo</p>
                    <p>
                        {userInfo && userInfo.nombres}{' '}
                        {userInfo && userInfo.apellidos}
                    </p>
                    <p className="fw-bold">Nombre de usuario</p>
                    <p>{userInfo && userInfo.nombreUsuario}</p>
                    <p className="fw-bold">Rol</p>
                    <p>{userInfo && userInfo.nombreRol}</p>
                    <p className="fw-bold">Fecha de nacimiento</p>
                    <p>
                        {userInfo && userInfo.fechaNacimiento
                            ? format(
                                  Date.parse(
                                      userInfo && userInfo.fechaNacimiento
                                  ),
                                  'PPP',
                                  {
                                      locale: es,
                                  }
                              )
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
            </section>
        </div>
    );
};

export default UserProfile;
