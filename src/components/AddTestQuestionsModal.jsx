import React, { useEffect, useState } from 'react';
import testsService from '../services/testsService';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

const AddTestQuestionsModal = (props) => {
  const defaultNewQuestion = {
    titulo: '',
    respuesta: [
      {
        contenido: '',
        esCorrecta: true,
      },
      {
        contenido: '',
        esCorrecta: false,
      },
      {
        contenido: '',
        esCorrecta: false,
      },
      {
        contenido: '',
        esCorrecta: false,
      },
    ],
  };

  const [registeredQuestions, setRegisteredQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ ...defaultNewQuestion });
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);

  const handleNewQuestionTitle = (e) => {
    const title = e.target.value;

    setNewQuestion({
      ...newQuestion,
      titulo: title,
    });
  };

  const handleAnswerContentChange = (e, index) => {
    const content = e.target.value;

    if (index != null) {
      const answers = newQuestion.respuesta;
      answers[index].contenido = content;

      setNewQuestion({
        ...newQuestion,
        respuesta: answers,
      });
    }
  };

  const handleCorrectAnswerClick = (index) => {
    if (index !== null) {
      const answers = newQuestion.respuesta;
      const selectedAnswer = answers[index];

      answers.forEach((answer) => {
        if (answer.esCorrecta === false && answer === selectedAnswer) {
          answer.esCorrecta = true;
        }

        if (answer.esCorrecta === true && answer !== selectedAnswer) {
          answer.esCorrecta = false;
        }
      });

      setNewQuestion({
        ...newQuestion,
        respuesta: answers,
      });

      console.log(answers);
    }
  };

  const cleanNewQuestion = () => {
    setNewQuestion({ ...defaultNewQuestion });
  };

  const getRegisteredQuestions = async () => {
    try {
      const result = await testsService.getMyQuestionPool();
      setRegisteredQuestions(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewQuestion = async (e) => {
    e.preventDefault();
    try {
      const result = await testsService.addToQuestionPool(newQuestion);
      // props.onQuestionSelected(newQuestion);
      cleanNewQuestion();
      await getRegisteredQuestions();
      alert('¡La pregunta ha sido añadida exitosamente!');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const init = async () => {
      await getRegisteredQuestions();
    };
    init();
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="fw-bold">Añadir preguntas</Modal.Header>
      <Modal.Body>
        <Tab.Container
          id="test-creating-tabs"
          defaultActiveKey="preguntas-disponibles"
        >
          <Nav justify className="pb-3 justify-content-center" variant="pills">
            <Nav.Item className="tab-pills">
              <Nav.Link
                className="tab-pills-children"
                eventKey="preguntas-disponibles"
              >
                Preguntas disponibles
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="tab-pills">
              <Nav.Link
                className="tab-pills-children"
                eventKey="nueva-pregunta"
              >
                Nueva pregunta
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="preguntas-disponibles">
              <section id="registered-questions" className="my-5">
                {registeredQuestions && registeredQuestions.length > 0 ? (
                  <Accordion
                    defaultActiveKey="" /*{registeredQuestions[0].id}*/
                  >
                    {registeredQuestions.map((question, index) => (
                      <Accordion.Item eventKey={index}>
                        <Accordion.Header>{question.titulo}</Accordion.Header>
                        <Accordion.Body>
                          {question.respuesta &&
                            question.respuesta.map((respuesta, index) => (
                              <div key={index} className="input-group mb-3">
                                <span
                                  className="input-group-text pointer-cursor"
                                  id={`Respuesta${index}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleCorrectAnswerClick(index);
                                  }}
                                >
                                  {respuesta.esCorrecta ? (
                                    <AiFillCheckCircle
                                      className="cursor-pointer text-success"
                                      size={25}
                                    />
                                  ) : (
                                    <AiFillCloseCircle
                                      className="text-danger"
                                      size={25}
                                    />
                                  )}
                                </span>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={respuesta.contenido}
                                  onChange={(e) => {
                                    handleAnswerContentChange(e, index);
                                  }}
                                  placeholder={`Respuesta ${index + 1}`}
                                  aria-label="Username"
                                  aria-describedby={`Respuesta${index}`}
                                  disabled
                                />
                              </div>
                            ))}
                          <button
                            className="w-100 btn btn-success"
                            onClick={(e) => {
                              e.preventDefault();
                              props.onQuestionSelected(question);
                            }}
                          >
                            Añadir pregunta a prueba
                          </button>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <h6 className="text-center">
                    No tiene preguntas registradas en su banco de preguntas
                  </h6>
                )}
              </section>
            </Tab.Pane>
            <Tab.Pane eventKey="nueva-pregunta">
              <section className="my-5">
                <form
                  className="form"
                  onSubmit={saveNewQuestion}
                  autoComplete="false"
                >
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="titulo"
                      id="titulo"
                      value={newQuestion.titulo}
                      autoComplete="off"
                      minLength="2"
                      maxLength="50"
                      onChange={handleNewQuestionTitle}
                      required
                    />
                    <label htmlFor="titulo" className="label-top">
                      <span className="label-content">Pregunta</span>
                    </label>
                    <div className="underline"></div>
                  </div>
                  <div className="">
                    {newQuestion.respuesta &&
                      newQuestion.respuesta.map((respuesta, index) => (
                        <div key={index} className="input-group mb-3">
                          <span
                            className="input-group-text pointer-cursor"
                            id={`Respuesta${index}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleCorrectAnswerClick(index);
                            }}
                          >
                            {respuesta.esCorrecta ? (
                              <AiFillCheckCircle
                                className="cursor-pointer text-success"
                                size={25}
                              />
                            ) : (
                              <AiFillCloseCircle
                                className="text-danger"
                                size={25}
                              />
                            )}
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={newQuestion.respuesta[index].contenido}
                            onChange={(e) => {
                              handleAnswerContentChange(e, index);
                            }}
                            placeholder={`Respuesta ${index + 1}`}
                            aria-label="Username"
                            aria-describedby={`Respuesta${index}`}
                            required
                          />
                        </div>
                      ))}
                  </div>
                  <button className="w-100 btn btn-success">
                    Añadir nueva pregunta
                  </button>
                </form>
              </section>
            </Tab.Pane>

            <Tab.Pane eventKey="actividad">
              <div className="py-5 d-flex flex-column align-items-center">
                <h1 className="fw-bold">Actividades de los estudiantes</h1>
                {/* Agregar la parte de la fecha de ingreso en el sistema */}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default AddTestQuestionsModal;
