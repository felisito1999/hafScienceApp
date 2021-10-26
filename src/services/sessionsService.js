import axios from 'axios';
import { da } from 'date-fns/locale';

const apiUrl = process.env.REACT_APP_API_URL;

let sessionsService = {};

sessionsService.getPaginatedTeacherSessions = async (pageNumber, pageSize) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta');
    }, 20000);

    const config = {
        method: 'get',
        cancelToken: source.token,
        url: `${apiUrl}sesiones`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };
    try {
        const response = await axios(config);
        clearTimeout(timeout);

        return response;
    } catch (error) {
        console.log(error);
        clearTimeout(timeout);
    }
};

sessionsService.getPaginatedTeacherSessionsBy = async (pageNumber, pageSize, searchParameters) => {
    const CancelToken = axios.CancelToken; 
    const source = CancelToken.source();

    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta');
    }, 20000);

    const config = {
        method: 'get',
        cancelToken: source.token,
        params: {
            pageNumber,
            pageSize,
            ...searchParameters
        },
        url: `${apiUrl}sesiones`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: null
    }

    try {
        const response = await axios(config);
        clearTimeout(timeout);

        return response;
    } catch (error) {
        console.log(error);
        clearTimeout(timeout);
    }
}

sessionsService.getById = async (id) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de espera');
    }, 10000);

    const config = {
        method: 'get',
        cancelToken: source.token,
        params: {
            id: id
        },
        url: `${apiUrl}sesiones`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: null
    }

    try {
        const response = await axios(config);
        clearTimeout(timeout);

        return response; 
    } catch (error) {
        clearTimeout(timeout);
        console.log(error.response);
    }
}

sessionsService.saveSession = async (session) => {
    
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de espera');
    }, 10000);

    const config = {
        method: 'post',
        cancelToken: source.token,
        url: `${apiUrl}sesiones`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: session
    }

    try {
        const response = await axios(config);
        clearTimeout(timeout);

        return response; 
    } catch (error) {
        clearTimeout(timeout);
        console.log(error.response);
    }
}

export default sessionsService;
