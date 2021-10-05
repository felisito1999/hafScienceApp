import axios from 'axios';

let authService = {};

authService.signIn = async (username, password) => {
    const CancelToken = axios.CancelToken;
    const data = JSON.stringify({
        NombreUsuario: username,
        Contrasena: password,
    });
    const source = CancelToken.source();
    const timeout = setTimeout(() => {
        source.cancel();
        console.log('Ha pasado el tiempo máximo de respuesta');
    }, 5000);

    const config = {
        method: 'post',
        cancelToken: source.token,
        url: `${process.env.REACT_APP_API_URL}auth/token`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data,
    };

    try {
        const response = await axios(config);

        if (response.status === 200) {
            localStorage.setItem(
                'userData',
                JSON.stringify(response.data.userInfo)
            );
            localStorage.setItem('token', response.data.token);
        }
        clearTimeout(timeout);

        return response.status;
    } catch (error) {
        alert('No se pudo iniciar sesión, intenta de nuevo');
        clearTimeout(timeout);

        if(error.response == null){
            return 503;
        }

        return error.response.status;
    }
};

authService.logout = async () => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}auth/logout`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: null
    };

    const response = await axios(config);

    localStorage.removeItem('userData');
    localStorage.removeItem('token');

    return response.status;
};

authService.isSignedIn = async () => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const timeout = setTimeout(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta para la solicitud');
    }, 10000);

    const config = {
        url: `${process.env.REACT_APP_API_URL}auth/check`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config)
        clearTimeout(timeout);
        return {
            value: response.data,
            message: 'El usuario tiene una sesión iniciada'
        }
    } catch (error) {
        console.log(error);
        clearTimeout(timeout);
        return {
            value: false,
            message: 'Ha ocurrido un error al verificar el estado de la sesión' 
        }
    }
};

export default authService;
