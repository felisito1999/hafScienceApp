import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

let userService = {};

userService.getAllPaginatedUsers = async (page, pageSize) => {
  const config = {
    url: `${apiUrl}usuarios`,
    params: {
      page: page,
      pageSize: pageSize,
    },
    method: 'get',
    headers: {
      Authorize: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    console.log(error);
    if (error.response) {
      return error.response.status;
    }

    return 500;
  }
};

userService.getAllPaginatedUsersBy = async (
  pageNumber,
  pageSize,
  usersSearchParameters
) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'get',
    url: `${apiUrl}usuarios`,
    cancelToken: source.token,
    params: {
      page: pageNumber,
      pageSize: pageSize,
      ...usersSearchParameters,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const response = await axios(config);
    clearTimeout(timeout);

    return response.data;
  } catch (error) {
    console.log(error);
    clearTimeout(timeout);
  }
};

userService.getPaginatedSessionStudents = async (page, pageSize, sessionId) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'get',
    url: `${apiUrl}usuarios`,
    cancelToken: source.token,
    params: {
      page: page,
      pageSize: pageSize,
      sessionId: sessionId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  // await axios(config)
  //     .then((response) => {
  //         clearTimeout(timeout);
  //         console.log(response);
  //         return response;
  //     })
  //     .catch((error) => {
  //         clearTimeout(timeout);
  //         console.log(error);
  //         return error;
  //     });
  try {
    const response = await axios(config);
    clearTimeout(timeout);
    return response;
  } catch (error) {
    console.log(error);
    clearTimeout(timeout);
  }
};

userService.getById = async (id) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'get',
    url: `${apiUrl}usuarios`,
    cancelToken: source.token,
    params: {
      id: id,
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
    console.log(error);
  }
};

userService.registerUser = async (user) => {
  const data = JSON.stringify(user);
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'post',
    cancelToken: source.token,
    url: `${apiUrl}auth/register`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    console.log(error);
  }
};

userService.updateUser = async (user) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'put',
    cancelToken: source.token,
    url: `${apiUrl}usuarios`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: user,
  };
  console.log(user);
  try {
    const response = await axios(config);
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    console.log(error);
  }
};

userService.disableUser = async (id) => {
  const source = axios.CancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'delete',
    cancelToken: source.token,
    url: `${apiUrl}usuarios`,
    params: {
      id: id,
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
    console.log(error);
    clearTimeout(timeout);
  }
};
export default userService;
