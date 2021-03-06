import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import provinciasService from '../services/provinciasService';
import municipiosService from '../services/municipiosService';
import schoolsService from '../services/schoolsService';
import validationService from '../services/validationService';
import DateTimePicker from 'react-datetime-picker';

const CreateSchoolModal = (props) => {
  const defaultSchool = {
    codigoCentro: '',
    nombre: '',
    direccion: '',
    regionalId: 0,
    distritoId: 0,
    directorId: 1,
    tipoCentroEducativoId: 0,
    provinciaId: 0,
    municipioId: 0,
  };
  const [school, setSchool] = useState(defaultSchool);
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [regionales, setRegionales] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);

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
      provinciaId: provinciaId,
    });

    if (provinciaId !== 0) {
      getMunicipiosByProvinciaId(provinciaId);
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
      municipioId: 0,
    });
    setMunicipios([]);
  };

  const handleRegionalesChange = async (e) => {
    const regionalId = e.target.value;
    resetDistritos();
    setSchool({
      ...school,
      regionalId: regionalId,
    });

    if (regionalId !== 0) {
      getDistritosByRegionalId(regionalId);
    }
  };

  const handleDistritosChange = (e) => {
    setSchool({
      ...school,
      distritoId: e.target.value,
    });
  };

  const resetDistritos = () => {
    setSchool({
      ...school,
      distritoId: 0,
    });
    setDistritos([]);
  };

  const handleCodigoCentroChange = (e) => {
    if (Number.isInteger(parseInt(e.target.value), 10)) {
      setSchool({
        ...school,
        codigoCentro: e.target.value,
      });
    } else {
      alert('Los c??digos solo pueden tener n??meros');
    }
  };

  const handleSchoolTypeChange = (e) => {
    setSchool({
      ...school,
      tipoCentroEducativoId: e.target.value,
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

    if (areFieldsValidated()) {
      await saveSchool(school);
      clearFields();
    }
  };

  const clearFields = () => {
    setSchool(defaultSchool);
    resetMuncipios();
    resetDistritos();
  };

  const getProvincias = async () => {
    const provinciasResponse = await provinciasService.getAllProvincias();
    if (provinciasResponse) {
      setProvincias(provinciasResponse.data);
    }
  };

  const getMunicipiosByProvinciaId = async (provinciaId) => {
    const municipiosResponse = await municipiosService.getByProvinciaId(
      provinciaId
    );
    if (municipiosResponse) {
      setMunicipios(municipiosResponse.data);
    }
  };

  const getRegionales = async () => {
    const regionalesResponse = await schoolsService.getRegionales();
    if (regionalesResponse) {
      setRegionales(regionalesResponse.data);
    }
  };

  const getDistritosByRegionalId = async (regionalId) => {
    const distritosResponse = await schoolsService.getDistritosByRegionalId(
      regionalId
    );
    if (distritosResponse) {
      setDistritos(distritosResponse.data);
    }
  };

  const getSchoolTypes = async () => {
    const schoolTypesResponse = await schoolsService.getAllSchoolTypes();

    if (schoolTypesResponse) {
      setSchoolTypes(schoolTypesResponse.data);
    }
  };

  const areFieldsValidated = () => {
    const messages = [];
    if (school.codigoCentro.length !== 5) {
      messages.push('El codigo de centro debe tener 5 n??meros de largo.');
    }

    if (
      validationService.isNullOrWhiteSpace(school.nombre) ||
      school.nombre.length < 8
    ) {
      messages.push(
        'El nombre del centro educativo debe tener al menos 8 caracteres.'
      );
    }

    if (
      validationService.isNullOrWhiteSpace(school.direccion) ||
      school.direccion.length < 8
    ) {
      messages.push('La direcci??n debe tener al menos 25 caracteres.');
    }

    if (school.provinciaId === 0) {
      messages.push('Debe seleccionar una provincia.');
    }

    if (school.municipioId === 0) {
      messages.push('Debe seleccionar un municipio.');
    }

    if (school.regionalId === 0) {
      messages.push('Debe seleccionar una regional.');
    }

    if (school.distritoId === 0) {
      messages.push('Debe seleccionar un distrito.');
    }

    if (school.tipoCentroEducativoId === 0) {
      messages.push('Debe especificar el tipo del centro.');
    }

    if (messages.length > 0) {
      alert(
        'No se puede ingresar el centro educativo, revise lo siguiente:\n' +
          messages.map((message) => '\t-' + message + '\n').join('')
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    const setInitData = async () => {
      getProvincias();
      getRegionales();
      getSchoolTypes();
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
          <div className="form-group mb-3 ">
            <input
              type="text"
              name="codigo-centro"
              id="codigo-centro"
              value={school.codigoCentro}
              autoComplete="off"
              minLength="5"
              maxLength="5"
              onChange={handleCodigoCentroChange}
              required
            />
            <label htmlFor="codigo-centro" className="label-top">
              <span className="label-content">Codigo de centro</span>
            </label>
            <div className="underline"></div>
          </div>
          <div className="form-group mb-3 ">
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={school.nombre}
              autoComplete="off"
              minLength="8"
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
            <label htmlFor="direccion" className="form-label mb-4">
              <span>Direcci??n</span>
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
          <div className="pt-5 d-flex flex-column flex-sm-row">
            <div className="form-group me-sm-1 me-md-2">
              <select
                name="school-provincias"
                id="school-provincias"
                className="form-select"
                value={school.provinciaId}
                onChange={handleProvinciasChange}
              >
                <option value={0}>Seleccione provincia</option>
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
                className="form-select"
                value={school.municipioId}
                onChange={handleMunicipiosChange}
                disabled={school.provinciaId == 0 ? true : false}
              >
                <option value={0}>Seleccione municipio</option>
                {municipios &&
                  municipios.map((municipio) => (
                    <option key={municipio.id} value={municipio.id}>
                      {municipio.nombre}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="d-flex flex-column flex-sm-row">
            <div className="form-group me-sm-1 me-md-2">
              <select
                name="school-regionales"
                id="school-regionales"
                className="form-select"
                value={school.regionalId}
                onChange={handleRegionalesChange}
              >
                <option value={0}>Seleccione la regional</option>
                {regionales &&
                  regionales.map((regional) => (
                    <option key={regional.id} value={regional.id}>
                      {regional.nombre}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <select
                name="school-distritos"
                id="school-distritos"
                className="form-select"
                value={school.distritoId}
                onChange={handleDistritosChange}
                disabled={school.regionalId == 0 ? true : false}
              >
                <option value={0}>Seleccione la distrito</option>
                {distritos &&
                  distritos.map((distrito) => (
                    <option key={distrito.id} value={distrito.id}>
                      {distrito.nombre}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <select
              name="school-types"
              id="school-types"
              className="form-select"
              value={school.tipoCentroEducativoId}
              onChange={handleSchoolTypeChange}
            >
              <option value={0}>Tipo de centro</option>
              {schoolTypes &&
                schoolTypes.map((schoolType) => (
                  <option key={schoolType.id} value={schoolType.id}>
                    {schoolType.nombre}
                  </option>
                ))}
            </select>
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
