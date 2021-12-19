import axios from 'axios';

const apiHost = process.env.REACT_APP_API_URL;
let testsService = {};

testsService.getMyQuestionPool = async () => {
  const config = {
    method: 'get',
    url: `${apiHost}preguntas/banco-preguntas`,
    headers: {
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

testsService.getMyQuestionPoolByTitle = async (title) => {
  const config = {
    method: 'get',
    url: `${apiHost}preguntas/banco-preguntas-by-title`,
    params: {
      title: title,
    },
    headers: {
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

testsService.savePruebaDiagnostica = async (pruebaDiagnostica) => {
  // const data = {
  //   pruebasDiagnosticas: {
  //     titulo: pruebaDiagnostica.titulo,
  //     calificacionMaxima: pruebaDiagnostica.calificacionMaxima
  //   },
  //   preguntas: pruebaDiagnostica.preguntas
  // };
  const pruebaDiagnosticaConfig = {
    method: 'post',
    url: `${apiHost}pruebasdiagnosticas/save-prueba-diagnostica`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: pruebaDiagnostica,
  };

  try {
    const pruebasDiagnosticasResponse = await axios(pruebaDiagnosticaConfig);
    return pruebasDiagnosticasResponse;
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

testsService.addToQuestionPool = async (question) => {
  const pruebaDiagnosticaConfig = {
    method: 'post',
    url: `${apiHost}preguntas/agregar-pregunta`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      ...question,
    },
  };

  try {
    const pruebasDiagnosticasResponse = await axios(pruebaDiagnosticaConfig);
    return pruebasDiagnosticasResponse;
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

testsService.getMyTests = async (page, pageSize) => {
  const config = {
    method: 'get',
    params: {
      page: page,
      pageSize: pageSize,
    },
    url: `${apiHost}pruebasdiagnosticas/teacher-pruebas-diagnosticas`,
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

testsService.assignTestToSession = async (assignment) => {
  const config = {
    method: 'post',
    url: `${apiHost}pruebasdiagnosticas/assign-to-session`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: assignment,
  };

  try {
    console.log(assignment);
    const result = await axios(config);
    return result;
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

testsService.getBySessionId = async (page, pageSize, sessionId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/session-pruebas-diagnosticas`,
    params: {
      sessionId: sessionId,
      page: page,
      pageSize: pageSize,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const result = await axios(config);
    return result;
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

testsService.getTestAttempt = async (pruebaDiagnosticaId, sessionId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/get-attempt`,
    params: {
      pruebaDiagnosticaId: pruebaDiagnosticaId,
      sessionId: sessionId,
    },
    headers: {
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

testsService.submitTestAttempt = async (attemptModel) => {
  const config = {
    method: 'post',
    url: `${apiHost}pruebasdiagnosticas/submit-attempt`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: attemptModel,
  };

  try {
    const response = await axios(config);
    alert('¡Se ha registrado su intento satisfactoriamente!');
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

testsService.getTestDetails = async (testId, sessionId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/test-details`,
    params: {
      testId: testId,
      sessionId: sessionId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

testsService.getSessionAverageGrades = async (sessionId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/session-average-grades`,
    params: {
      sessionId: sessionId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

testsService.getSessionTestAverageGrades = async (sessionId, testId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/session-test-average-grades`,
    params: {
      sessionId: sessionId,
      testId: testId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

testsService.getStudentSessionAverageGrades = async (sessionId, studentId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/student-session-average-grades`,
    params: {
      sessionId: sessionId,
      studentId: studentId,
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: null,
  };

  try {
    const response = await axios(config);

    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};

testsService.getTestSessionGrades = async (sessionId, testId) => {
  const config = {
    method: 'get',
    url: `${apiHost}pruebasdiagnosticas/session-test-grades`,
    params: {
      sessionId: sessionId,
      testId: testId
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
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}

export default testsService;
