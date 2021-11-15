import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import municipiosService from '../services/municipiosService';
import provinciasService from '../services/provinciasService';
import schoolsService from '../services/schoolsService';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const SchoolDetailsModal = (props) => {
  const [school, setSchool] = useState(null);
  const [updateSchool, setUpdateSchool] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [distritos, setDistritos] = useState([]);
  const [regionales, setRegionales] = useState([]);
  const [schoolTypes, setSchoolTypes] = useState([]);

  const handleNombreChange = (e) => {
    e.preventDefault();

    setUpdateSchool({
      ...updateSchool,
      nombre: e.target.value,
    });
  };

  const handleDireccionChange = (e) => {
    e.preventDefault();

    setUpdateSchool({
      ...updateSchool,
      direccion: e.target.value,
    });
  };

  const handleOpenDelete = () => {
    setIsDeleting(true);
  };

  const handleCloseDelete = () => {
    setIsDeleting(false);
    props.onHide();
  };

  const handleDeleteSchool = async () => {
    if (isDeleting) {
      const response = await schoolsService.disableSchool(school.id);
      console.log(response);
      if (typeof response !== 'undefined' && response.status === 'Success') {
        props.onHide();
        alert('Se ha deshabilitado el centro educativo con éxito');
      } else {
        alert('No se ha podido deshabilitar el centro educativo');
      }
    }
  };

  const handleEnableUpdate = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    setUpdateSchool(school);
  };

  const handleSchoolUpdate = async (school) => {
    if (isEditing) {
      const response = await schoolsService.updateSchool(school);
      if (typeof response !== 'undefined' && response.status === 'Success') {
        props.onHide();
        alert('Se ha modificado el centro educativo con éxito');
      } else {
        alert('No se ha podido modificar el centro educativo');
      }
    }
  };

  const handleCodigoCentroChange = (e) => {
    if (Number.isInteger(parseInt(e.target.value), 10)) {
      setUpdateSchool({
        ...updateSchool,
        codigoCentro: e.target.value,
      });
    } else {
      alert('Los códigos solo pueden tener números');
    }
  };

  const handleSchoolTypeChange = (e) => {
    setUpdateSchool({
      ...updateSchool,
      tipoCentroEducativoId: e.target.value,
    });
  };

  const handleProvinciasChange = async (e) => {
    const provinciaId = e.target.value;
    resetMuncipios();

    setUpdateSchool({
      ...updateSchool,
      provinciaId: provinciaId,
    });

    if (provinciaId !== 0) {
      getMunicipiosByProvinciaId(provinciaId);
    }
  };

  const handleMunicipiosChange = (e) => {
    setUpdateSchool({
      ...updateSchool,
      municipioId: e.target.value,
    });
  };

  const resetProvincias = () => {
    setUpdateSchool({
      ...updateSchool,
      provinciaId: 0,
    });
  };
  const resetMuncipios = () => {
    setUpdateSchool({
      ...updateSchool,
      municipioId: 0,
    });
    setMunicipios([]);
  };

  const handleRegionalesChange = async (e) => {
    const regionalId = e.target.value;
    resetDistritos();
    setUpdateSchool({
      ...updateSchool,
      regionalId: regionalId,
    });

    if (regionalId !== 0) {
      getDistritosByRegionalId(regionalId);
    }
  };

  const handleDistritosChange = (e) => {
    setUpdateSchool({
      ...updateSchool,
      distritoId: e.target.value,
    });
  };
  const resetRegionales = () => {
    setUpdateSchool({
      ...updateSchool,
      regionalId: 0,
    });
  };
  const resetDistritos = () => {
    setUpdateSchool({
      ...updateSchool,
      distritoId: 0,
    });
    setDistritos([]);
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

  const getSchoolTypes = async () => {
    const schoolTypesResponse = await schoolsService.getAllSchoolTypes();

    if (schoolTypesResponse) {
      setSchoolTypes(schoolTypesResponse.data);
    }
  };

  useEffect(() => {
    const getInitData = async () => {
      const schoolData = await schoolsService.getById(props.schoolId);
      setSchool(schoolData);
      getProvincias();
      getMunicipiosByProvinciaId(schoolData.provinciaId);
      getRegionales();
      getDistritosByRegionalId(schoolData.regionalId);
      getSchoolTypes();
    };

    getInitData();
  }, []);
  return (
    <>
      {isDeleting ? (
        <ConfirmDeleteModal
          show={isDeleting}
          onHide={handleCloseDelete}
          object={'centro educativo'}
          handleConfirmDelete={handleDeleteSchool}
        />
      ) : null}

      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          className="fw-bold d-flex justify-content-center"
          closeButton
        >
          <h5 className="text-center">Informacion del centro educativo</h5>
        </Modal.Header>
        <Modal.Body>
          <form
            autoComplete="off"
            className="form"
            onSubmit={handleSchoolUpdate}
          >
            {isEditing ? (
              <>
                <div className="form-group mb-3 ">
                  <input
                    type="text"
                    name="codigo-centro"
                    id="codigo-centro"
                    value={updateSchool.codigoCentro}
                    autoComplete="off"
                    minLength="5"
                    maxLength="5"
                    onChange={handleCodigoCentroChange}
                    required
                  />
                  <label htmlFor="nombre" className="label-top">
                    <span className="label-content">Codigo de centro</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    value={updateSchool.nombre}
                    autoComplete="off"
                    minLength="2"
                    maxLength="50"
                    onChange={handleNombreChange}
                    required
                  />
                  <label htmlFor="nombres" className="label-top">
                    <span className="label-content">Nombre de centro educativo</span>
                  </label>
                  <div className="underline"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="direccion" className="form-label mb-4">
                    <span>Dirección</span>
                  </label>
                  <textarea
                    type="text"
                    name="direccion"
                    id="direccion"
                    value={updateSchool.direccion}
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
                      value={updateSchool.provinciaId}
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
                      value={updateSchool.municipioId}
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
                      value={updateSchool.regionalId}
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
                      value={updateSchool.distritoId}
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
                    value={updateSchool.tipoCentroEducativoId}
                    onChange={handleSchoolTypeChange}
                  >
                    <option value={0}>Tipo de centro</option>
                    {schoolTypes &&
                      schoolTypes.map((schoolType) => (
                        <option value={schoolType.id}>
                          {schoolType.nombre}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <p className="fw-bold">Nombre</p>
                <p>{school && school.nombre}</p>
                <p className="fw-bold">Tipo de centro</p>
                <p>{school && school.tipoCentroEducativoNombre}</p>
                <p className="fw-bold">Codigo de centro</p>
                <p>{school && school.codigoCentro}</p>
                <p className="fw-bold">Director/a</p>
                <p>{school && school.directorNombreCompleto}</p>
                <p className="fw-bold">Regional</p>
                <p>{school && school.regionalNombre}</p>
                <p className="fw-bold">Distrito</p>
                <p>{school && school.distritoNombre}</p>
                <p className="fw-bold">Provincia</p>
                <p>{school && school.provinciaNombre}</p>
                <p className="fw-bold">Municipio</p>
                <p>{school && school.municipioNombre}</p>
                <p className="fw-bold">Dirección</p>
                <p>{school && school.direccion}</p>
                <p className="fw-bold">Estado del centro educativo</p>
                <p>{school && school.nombreEstado}</p>
              </div>
            )}
            <Modal.Footer className="d-flex justify-content-evenly mt-5">
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDelete();
                }}
              >
                Deshabilitar centro educativo
              </button>
              {isEditing ? (
                <button className="btn btn-danger" onClick={handleEnableUpdate}>
                  Volver a visualizar información del centro educativo
                </button>
              ) : null}
              <button
                type="submit"
                className="btn btn-warning"
                onClick={(e) => {
                  if (isEditing) {
                    e.preventDefault();
                    handleSchoolUpdate(updateSchool);
                  } else {
                    handleEnableUpdate(e);
                  }
                }}
              >
                Modificar centro educativo
              </button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SchoolDetailsModal;
