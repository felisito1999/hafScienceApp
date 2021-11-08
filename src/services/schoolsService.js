import axios from 'axios';

let schoolsService = {};

schoolsService.getAll = async () => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos/getall`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.getAllPaginatedSchools = async (page, pageSize) => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        method: 'get',
        params: {
            page: page,
            pageSize: pageSize,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.getAllPaginatedSchoolsBy = async (
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
        url: `${process.env.REACT_APP_API_URL}centrosEducativos`,
        cancelToken: source.token,
        params: {
            page: pageNumber,
            pageSize: pageSize,
            ...searchParameters,
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
        console.log('se jodio el request')
        clearTimeout(timeout);
    }
};

schoolsService.getById = async (id) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta');
    }, 20000);

    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
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

        return response.data;
    } catch (error) {
        clearTimeout(timeout);
        console.log(error);
    }
};

schoolsService.loadByName = async (name) => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos/getByName`,
        method: 'get',
        params: {
            name: name,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.saveSchool = async (school) => {
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: school,
    };

    try {
        const response = await axios(config);

        return response;
    } catch (error) {
        console.log(error);
        if (error.response) {
            //La petición ha sido realizada y el servidor respondió con un status code de error. 
            if (error.response.data.message){
              alert(error.response.data.message);
            }
      
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
          else if (error.request) {
            //La petición fue realizada pero no se recibió ninguna respuesta.
            console.log(error.request);
          }
          else {
            //Ocurrió un error al momento de enviar la petición.
            console.log('Error', error.message);
          }
    }
};

schoolsService.updateSchool = async (school) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta');
    }, 20000);

    const config = {
        method: 'put',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        cancelToken: source.token,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: school
    }

    try {
        const response = await axios(config);
        clearTimeout(timeout);

        return response.data;
    } catch (error) {
        clearTimeout(timeout);
        console.log(error);
    }
};

schoolsService.disableSchool = async (id) => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const timeout = setInterval(() => {
        source.cancel();
        alert('Ha pasado el tiempo máximo de respuesta');
    }, 20000);

    const config = {
        method: 'delete',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
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

        return response.data;
    } catch (error) {
        clearTimeout(timeout);
        console.log(error);
    }
};

export default schoolsService;
