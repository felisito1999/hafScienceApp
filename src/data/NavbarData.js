import React from 'react';
import { FaUsers, FaSchool } from 'react-icons/fa';
import { AiFillHome, AiOutlineFieldTime } from 'react-icons/ai';
import { IoGameController, IoSchool } from 'react-icons/io5';
import { CgNotes } from 'react-icons/cg';
import { ReactComponent as ClassroomIcon } from '../images/classroom-teacher-svgrepo-com.svg';

const host = process.env.REACT_APP_HOST_NAME;

export const NavbarData = [
    {
        title: 'Página principal',
        path: `${host}`,
        icon: <AiFillHome />,
        className: 'nav-link',
        childs: null,
        roles: ['Administrador', 'Docente', 'Estudiante'],
    },
    {
        title: 'Pruebas diagnósticas',
        path: `${host}pruebas-diagnosticas`,
        icon: <CgNotes />,
        className: 'nav-link',
        childs: null,
        roles: ['Docente', 'Estudiante'],
    },
    {
        title: 'Juegos',
        path: `${host}juegos`,
        icon: <IoGameController />,
        className: 'nav-link',
        childs: null,
        roles: ['Docente', 'Estudiante'],
    },
    // {
    //     title: 'Administración de sesiones',
    //     path: '/admin-sesiones',
    //     icon: <SiGoogleclassroom />,
    //     className: 'nav-link',
    //     childs: null,
    // },
    {
        title: 'Usuarios',
        path: `${host}admin-usuarios`,
        icon: <FaUsers />,
        className: 'nav-link',
        childs: null,
        roles: ['Administrador'],
    },
    {
        title: 'Centros educativos',
        path: `${host}admin-centros`,
        icon: <FaSchool />,
        className: 'nav-link',
        childs: null,
        roles: ['Administrador'],
    },
    {
        title: 'Sesiones',
        path: `${host}admin-sesiones`,
        icon: <IoSchool />,
        className: 'nav-link',
        childs: null,
        roles: ['Administrador'],
    },
    {
        title: 'Sesiones',
        path: `${host}prof-sesiones`,
        icon: <IoSchool height={20}/>,
        className: 'nav-link',
        childs: null,
        roles: ['Docente'],
    }
];
