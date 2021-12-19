import jsPDF from 'jspdf';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import testsService from '../services/testsService';
import LoadingIcon from './LoadingIcon';
import DomToImage from 'dom-to-image';

const TeacherTestAttempts = (props) => {
  const { sessionId, pruebaId } = useParams();
  const [testAttempts, setTestAttempts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getTestGrades = async () => {
    try {
      const response = await testsService.getTestSessionGrades(
        sessionId,
        pruebaId
      );
      setTestAttempts(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  const handleCreateReport = async () => {
    const input = document.getElementById('report-area');
        const pdf = new jsPDF('p', 'pt', 'letter');

        if (pdf) {
          // pdf.html(input.innerHTML);
          // pdf.save('test');
          DomToImage.toJpeg(input, {quality: 1.0})
            .then(imgData => {
              const imageProps = pdf.getImageProperties(imgData);
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              pdf.save('reporte-promedio-calificaciones.pdf');
            });
        }
  };

  useEffect(() => {
    const init = async () => {
      await getTestGrades(sessionId, pruebaId);
      setIsLoading(false);
    };
    init();
  }, [sessionId, pruebaId]);

  return (
    <div className="component-wrapper">
      <section className="banner-bg container rounded-3 shadow py-3 my-5">
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <button
              className="w-100 mb-3 btn btn-success"
              onClick={(e) => {
                e.preventDefault();
                handleCreateReport();
              }}
            >
              Exportar reporte
            </button>
            <article id="report-area" className="bg-light">
              <h1 className="p-5 text-center rounded-3 bg-success fw-bold">Reporte de calificaciones</h1>
              <hr />
              <h1 className="text-center fw-bold">
                {testAttempts &&
                  testAttempts.pruebaInfo &&
                  testAttempts.pruebaInfo.titulo}
              </h1>
              <hr />
              {testAttempts &&
              testAttempts.grades &&
              testAttempts.grades.length > 0 ? (
                <table className="table table-md bg-light">
                  <thead>
                    <tr>
                      <th className="text-center">Estudiante</th>
                      <th className="text-center">Calificación</th>
                      <th className="text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testAttempts &&
                      testAttempts.grades &&
                      testAttempts.grades.map((grade, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            {grade.usuario.nombreUsuario}
                          </td>
                          <td className="text-center">
                            {grade.realizaPrueba
                              ? `${grade.realizaPrueba.calificacion}/${testAttempts.pruebaInfo.calificacionMaxima}`
                              : `-/${testAttempts.pruebaInfo.calificacionMaxima}`}
                          </td>
                          <td className="text-center">
                            {grade.realizaPrueba ? (
                              grade.realizaPrueba.calificacion < 70 ? (
                                <span className="text-danger">Reprobado</span>
                              ) : grade.realizaPrueba.calificacion < 90 ? (
                                <span className="text-warning">Aprobado</span>
                              ) : (
                                <span className="text-success">Aprobado</span>
                              )
                            ) : (
                              <span className="text-primary">
                                No completada
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <h1 className="py-5 text-center">
                  No se encontraron intentos de esta prueba
                </h1>
              )}
            </article>
          </>
        )}
      </section>
    </div>
  );
};

export default TeacherTestAttempts;
