import React from 'react';
import { FaBars, FaUsers } from 'react-icons/fa';
import { AiFillHome, AiOutlineTable } from 'react-icons/ai';
import { IoGameController } from 'react-icons/io5';
import { CgNotes } from 'react-icons/cg';
import { SiGoogleclassroom } from 'react-icons/si';

export const NavbarData = [
    {
        title: 'Página principal',
        path: '/',
        icon: <AiFillHome />,
        className: 'nav-link',
        childs: null,
        roles: ['Administrator', 'Teacher', 'Student'],
    },
    {
        title: 'Tabla periódica',
        path: '/tabla-periodica',
        icon: <AiOutlineTable />,
        className: 'nav-link',
        childs: null,
    },
    {
        title: 'Pruebas diagnósticas',
        path: '/pruebas',
        icon: <CgNotes />,
        className: 'nav-link',
        childs: null,
    },
    {
        title: 'Juegos',
        path: '/juegos',
        icon: <IoGameController />,
        className: 'nav-link',
        childs: null,
    },
    {
        title: 'Administración de sesiones',
        path: '/admin-sesiones',
        icon: <SiGoogleclassroom />,
        className: 'nav-link',
        childs: null,
    },
    {
        title: 'Administración de usuarios',
        path: '/admin-usuarios',
        icon: <FaUsers />,
        className: 'nav-link',
        childs: null,
    },
];
