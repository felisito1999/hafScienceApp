import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import schoolsService from '../services/schoolsService';

const CreateSchoolModal = (props) => {
  const defaultSchool = {
    codigo: '',
    nombre: '',
    direccion: '',
    regionalId: null,
    distritoId: null,
    directorId: null,
    tipoCentroEducativoId: null,
    provinciaId: null,
    municipioId: null,
  };
  const [school, setSchool] = useState({
    ...defaultSchool,
  });
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [regionales, setRegionales] = useState([]);

  const saveSchool = async () => {
    try {
      const response = await schoolsService.saveSchool(school);

      if (response.status === 200) {
        alert('Se ha agregado el centro educativo exitosamente');
      }
    } catch (error) {
      console.log(error);

      alert('No se ha podido completar la solicitud');
    }
  };

  const handleNombreChange = (e) => {
    e.preventDefault();

    setSchool({
      ...school,
      nombre: e.target.value,
    });
  };

  const handleDireccionChange = (e) => {
    e.preventDefault();

    setSchool({
      ...school,
      direccion: e.target.value,
    });
  };

  const handleSchoolSubmit = async (e) => {
    e.preventDefault();

    const result = await saveSchool(school);
    console.log(result);
    clearFields();
  };

  const clearFields = () => {
    setSchool({
      ...defaultSchool,
    });
  };

  const getRegionales = async () => {
    const regionalesResponse = await schoolsService.getRegionales();
    if (regionalesResponse.data){
      return regionalesResponse.data;
    }
  };
  const getDistritos = async () => {
    const distritosResponse = await schoolsService.getDistritos();
    if (distritosResponse.data){
      return distritosResponse.data;
    }
  };

  useEffect(() => {
    const setInitData = async () => {
      const regionales = await getRegionales();
      const distritos = await getDistritos();
      
      if (Array.isArray(regionales)){
        setRegionales(regionales);
      }
      if (Array.isArray(distritos)){
        setDistritos(distritos);
      }
    };

    setInitData();
  }, []);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="fw-bold text-center" closeButton>
        Ingrese los datos del nuevo centro educativo
      </Modal.Header>
      <Modal.Body>
        <form autoComplete="off" className="form" onSubmit={handleSchoolSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={school.nombres}
              autoComplete="off"
              minLength="2"
              maxLength="50"
              onChange={handleNombreChange}
              required
            />
            <label htmlFor="nombres" className="label-top">
              <span className="label-content">Nombres</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="form-group mt-5">
            <label htmlFor="direccion" className="form-label mb-4">
              <span>Dirección</span>
            </label>
            <textarea
              type="text"
              name="direccion"
              id="direccion"
              className="form-control"
              autoComplete="off"
              minLength="25"
              maxLength="128"
              rows="2"
              onChange={handleDireccionChange}
              required
            ></textarea>
          </div>

          <div className="d-flex justify-content-between mt-5">
            <button
              type="button"
              className="btn btn-danger"
              onClick={props.onHide}
            >
              cancelar
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {}}
            >
              Agregar centro educativo
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateSchoolModal;
