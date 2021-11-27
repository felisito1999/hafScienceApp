import axios from 'axios';

const host = process.env.REACT_APP_API_URL;   
let testService = {};

testService.savePruebaDiagnostica = async (pruebaDiagnostica) => {
  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const timeout = setTimeout(() => {
    source.cancel();
    alert('Ha pasado el tiempo máximo de respuesta');
  }, 20000);

  const pruebaDiagnosticaConfig = {
    cancelToken: source.token,
    method: 'post',
    url: `${host}save-prueba-diagnostica`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: {
      ...pruebaDiagnostica
    }
  };

  try {
    const pruebasDiagnosticasResponse = await axios(pruebaDiagnosticaConfig);
    clearTimeout(timeout);

    return pruebasDiagnosticasResponse; 
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
}