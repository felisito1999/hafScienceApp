import axios from 'axios';

const apiUrl = `${process.env.REACT_APP_API_URL}provincias`;
let provinciasService = {};

provinciasService.getAllProvincias = async () => {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const config = {
    method: 'get',
    url: `${apiUrl}`,
    header: {
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
