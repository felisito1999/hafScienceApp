import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Accordion from 'react-bootstrap/Accordion';

const AddTestQuestionsModal = (props) => {
  const [registeredQuestions, setRegisteredQuestions] = useState([]);
  const [isAddingNewQuestion, setIsAddingNewQuestion] = useState(false);

  const getRegisteredQuestions = async () => {
    try {
      // const result = await a.getRegisteredQuestions();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);

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
                    {registeredQuestions.map((question) => (
                      <Accordion.Item eventKey={question.id}>
                        <Accordion.Header>{question.titulo}</Accordion.Header>
                        <Accordion.Body>
                          {question.respuestas &&
                            question.respuestas.map((respuesta) => (
                              <div className="form-check">
                                <label
                                  htmlFor={`respuesta-${respuesta.id}`}
                                  className="form-check-input"
                                >
                                  {respuesta.titulo}
                                </label>
                              </div>
                            ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                ) : (
                  <h6>
                    No tiene preguntas registradas en su banco de preguntas
                  </h6>
                )}
              </section>
            </Tab.Pane>
            <Tab.Pane eventKey="nueva-pregunta">
              <section className="my-5"></section>
            </Tab.Pane>

            <Tab.Pane eventKey="actividad">
              <div className="py-5 d-flex flex-column align-items-center">
                <h1 className="fw-bold">Actividades de los estudiantes</h1>
                {/* Agregar la parte de la fecha de ingreso en el sistema */}
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <button className="w-100 btn btn-success">
          Añadir nueva pregunta pregunta
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default AddTestQuestionsModal;
