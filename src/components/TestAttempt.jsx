import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import testsService from '../services/testsService';
import LoadingIcon from './LoadingIcon';
import { ImPencil2 } from 'react-icons/im';
import { FiCircle } from 'react-icons/fi';
import { FaDotCircle } from 'react-icons/fa';
import Card from 'react-bootstrap/Card';

const TestAttempt = (props) => {
  const history = useHistory();
  const { prueba, session } = useParams();

  const host = process.env.REACT_APP_HOST_NAME;
  const [isLoading, setIsLoading] = useState(true);
  const [test, setTest] = useState(null);

  const getTest = async () => {
    try {
      const response = await testsService.getTestAttempt(prueba, session);

      setTest(response.data);
      setIsLoading(false);
    } catch (error) {
      history.push(`${host}est-sesiones/${session}`);
    }
  };

  const handleAnswerSelection = (questionIndex, answerIndex) => {
    if (questionIndex !== null && answerIndex !== null) {
      const questions = test.preguntas;
      const question = questions[questionIndex];
      const answer = question.respuestas[answerIndex];

      question.respuestas.forEach((element) => {
        if (element === answer) {
          element.selected = true;
        } else {
          element.selected = false;
        }
      });
      questions[questionIndex] = question;

      setTest({
        ...test,
        preguntas: questions,
      });
    }
  };

  const checkIsEveryQuestionSelected = () => {};

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    
    const attemptModel = {
      pruebaId: parseInt(prueba),
      sessionId: session,
      preguntas: test.preguntas
    };
    try {
      await testsService.submitTestAttempt(attemptModel)  
      history.push(`${host}est-sesiones/${session}`)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getTest();
    };
    init();
  }, []);

  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <form onSubmit={handleTestSubmit}>
            <article>
              <h1 className="fw-bold text-center">
                <ImPencil2 size={30} />
              </h1>
              <h1 className="fw-bold text-center">{test && test.titulo}</h1>
            </article>
            <article className="my-5">
              {test &&
                test.preguntas.map((pregunta, preguntaIndex) => (
                  <Card key={preguntaIndex}>
                    <Card.Header>
                      <span className="fw-bold">{preguntaIndex + 1}- </span>
                      {pregunta.tituloPregunta}
                    </Card.Header>
                    <Card.Body>
                      {pregunta.respuestas &&
                        pregunta.respuestas.map((respuesta, respuestaIndex) => (
                          <div
                            key={respuestaIndex}
                            className="input-group mb-3"
                          >
                            <span
                              className="input-group-text pointer-cursor"
                              id={`Respuesta${respuestaIndex}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleAnswerSelection(
                                  preguntaIndex,
                                  respuestaIndex
                                );
                              }}
                            >
                              {respuesta.selected ? (
                                <FaDotCircle
                                  className="cursor-pointer"
                                  size={25}
                                />
                              ) : (
                                <FiCircle size={25} />
                              )}
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              value={respuesta.contenido}
                              aria-label="Username"
                              aria-describedby={`Respuesta${respuestaIndex}`}
                              disabled
                            />
                          </div>
                        ))}
                    </Card.Body>
                  </Card>
                ))}
            </article>
            <button
              className="w-100 btn btn-success"
            >
              Terminar intento
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default TestAttempt;
