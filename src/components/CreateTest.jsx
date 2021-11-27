import React, { useState } from 'react';

function CreateTest(props) {
  const today = new Date();

  const defaultPruebaDiagnostica = {
    titulo: '',
    calificacionMaxima: 0,
    fechaInicio: today,
    fechaLimite: today.setDate(today.getDate() + 1),
    respuestas: [],
  };
  const [pruebaDiagnostica, setPruebaDiagnostica] = useState({
    ...defaultPruebaDiagnostica,
  });

  const handleTituloChange = (e) => {
    const titulo = e.target.value;

    setPruebaDiagnostica({
      pruebaDiagnostica,
      titulo: titulo,
    });
  };

  const handleCalificacionMaximaChange = (e) => {
    const calificacionMaxima = e.target.value;

    setPruebaDiagnostica({
      ...pruebaDiagnostica,
      calificacionMaxima: calificacionMaxima
    })
  }

  return (
    <div className="component-wrapper">
      <div className="container bg-light rounded-3 shadow py-3 my-5">
        <h1 className="text-center">Creación de pruebas diagnósticas</h1>
        <form className="form bg-light">
          <div className="form-group">
            <input
              type="text"
              name="titulo"
              id="titulo"
              value={pruebaDiagnostica.titulo}
              autoComplete="off"
              minLength="2"
              maxLength="50"
              onChange={handleTituloChange}
              required
            />
            <label htmlFor="titulo" className="label-top">
              <span className="label-content">Titulo</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="form-group">
          <input
              type="number"
              name="calificacion-maxima"
              id="calificacion-maxima"
              value={pruebaDiagnostica.calificacionMaxima}
              autoComplete="off"
              minLength="2"
              maxLength="50"
              onChange={handleTituloChange}
              required
            />
            <label htmlFor="titulo" className="label-top">
              <span className="label-content">Titulo</span>
            </label>
            <div className="underline"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTest;
