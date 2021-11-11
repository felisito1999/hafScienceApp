import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import provinciasService from '../services/provinciasService';
import municipiosService from '../services/municipiosService';
import schoolsService from '../services/schoolsService';
import { COMPARISON_BINARY_OPERATORS } from '@babel/types';

const CreateSchoolModal = (props) => {
  const defaultSchool = {
    codigo: '',
    nombre: '',
    direccion: '',
    regionalId: null,
    distritoId: null,
    directorId: null,
    tipoCentroEducativoId: null,
    provinciaId: 0,
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

  const handleProvinciasChange = async (e) => {
    const provinciaId = e.target.value;
    resetMuncipios();

    setSchool({
      ...school,
      provinciaId: provinciaId
    });

    if(provinciaId !== 0){
      const municipios = await getMunicipiosByProvinciaId(provinciaId)
      console.log(municipios);
      if(Array.isArray(municipios)){
        setMunicipios(municipios);
      }
    }
  };

  const handleMunicipiosChange = (e) => {
    setSchool({
      ...school,
      municipioId: e.target.value,
    });
  };

  const resetMuncipios = () => {
    setSchool({
      ...school,
      municipioId: null
    })
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
  const getProvincias = async () => {
    const provinciasResponse = await provinciasService.getAllProvincias();
    if (provinciasResponse) {
      return provinciasResponse.data;
    }
  };
  const getMunicipiosByProvinciaId = async (provinciaId) => {
    const municipiosResponse = await municipiosService.getByProvinciaId(provinciaId);
    console.log(municipiosResponse);
    if(municipiosResponse) {
      return municipiosResponse.data
    }
  };
  const getRegionales = async () => {
    const regionalesResponse = await schoolsService.getRegionales();
    if (regionalesResponse) {
      return regionalesResponse.data;
    }
  };
  const getDistritos = async () => {
    const distritosResponse = await schoolsService.getDistritos();
    if (distritosResponse) {
      return distritosResponse.data;
    }
  };

  useEffect(() => {
    const setInitData = async () => {
      const provincias = await getProvincias();
      const regionales = await getRegionales();
      const distritos = await getDistritos();

      if (Array.isArray(provincias)) {
        setProvincias(provincias);
      }
      if (Array.isArray(municipios)) {
        setMunicipios(municipios);
      }
      if (Array.isArray(regionales)) {
        setRegionales(regionales);
      }
      if (Array.isArray(distritos)) {
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
            <label htmlFor="nombre" className="label-top">
              <span className="label-content">Nombre de centro educativo</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="form-group">
            <select
              name="school-provincias"
              id="school-provincias"
              className="form-control"
              onChange={handleProvinciasChange}
            >
              <option value={0}>
                Seleccione la provincia
              </option>
              {provincias &&
                provincias.map((provincia) => (
                  <option key={provincia.id} value={provincia.id}>
                    {provincia.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <select
              name="school-municipios"
              id="school-municipios"
              className="form-control"
              onChange={handleMunicipiosChange}
              disabled={school.provinciaId == 0 ? true : false}
            >
              <option value={0}>
                Seleccione el municipio
              </option>
              {municipios &&
                municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.id}>
                    {municipio.nombre}
                  </option>
                ))}
            </select>
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
