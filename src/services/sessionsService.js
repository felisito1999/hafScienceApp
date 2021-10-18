import axios from 'axios';

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
            ...searchParameters
        },
        url: `${apiUrl}sesiones/my-sessions`,
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

export default sessionsService;
