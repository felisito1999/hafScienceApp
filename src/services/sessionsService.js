import axios from 'axios';

let sessionsService = {};

sessionsService.getTeacherSessions = async () => {
    const CancelToken = axios.CancelToken; 
    const source = CancelToken.source();
    
    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta');
    }, 20000);

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}sesiones`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        data: null
    }
}