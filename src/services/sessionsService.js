import axios from 'axios';
import { da } from 'date-fns/locale';

const apiUrl = process.env.REACT_APP_API_URL;

let sessionsService = {};

sessionsService.getPaginatedTeacherSessions = async (pageNumber, pageSize) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const timeout = setTimeout(() => {
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
    clearTimeout(timeout);
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
};

sessionsService.getPaginatedTeacherSessionsBy = async (
  pageNumber,
  pageSize,
  searchParameters
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'get',
    cancelToken: source.token,
    params: {
      page: pageNumber,
      pageSize,
      ...searchParameters,
    },
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
    clearTimeout(timeout);
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
};

sessionsService.getById = async (id) => {

  const config = {
    method: 'get',
    params: {
      id: id,
    },
    url: `${apiUrl}sesiones`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
};

sessionsService.saveSession = async (session) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de espera');
  }, 10000);

  const config = {
    method: 'post',
    cancelToken: source.token,
    url: `${apiUrl}sesiones`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: session,
  };

  try {
    const response = await axios(config);
    clearTimeout(timeout);

    return response;
  } catch (error) {
    clearTimeout(timeout);
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
};

sessionsService.updateSession = async (session) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de espera');
  }, 10000);

  const config = {
    method: 'put',
    cancelToken: source.token,
    url: `${apiUrl}sesiones`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: session,
  };

  try {
    const response = await axios(config);
    clearTimeout(timeout);

    return response;
  } catch (error) {
    clearTimeout(timeout);
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
};

sessionsService.deleteSession = async (sessionId) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de espera');
  }, 10000);

  const config = {
    method: 'delete',
    cancelToken: source.token,
    url: `${apiUrl}sesiones`,
    params: {
      id: sessionId,
    },
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
    clearTimeout(timeout);
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
};

sessionsService.getSessionActivity = async (sessionId) => {
  const config = {
    method: 'get',
    url: `${apiUrl}sesiones/session-activity`,
    params: {
      sessionId: sessionId
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: null
  }

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    if (error.response) {
      //La petición ha sido realizada y el servidor respondió con un status code de error.
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      //La petición fue realizada pero no se recibió ninguna respuesta.
      console.log(error.request);
    } else {
      //Ocurrió un error al momento de enviar la petición.
      console.log('Error', error.message);
    }
  }
}
export default sessionsService;
