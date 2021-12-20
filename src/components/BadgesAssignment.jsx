import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import { IoMdArrowBack } from 'react-icons/io';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import badgesService from '../services/badgesService';
import validationService from '../services/validationService';
import Pagination from './Pagination';
import LoadingIcon from './LoadingIcon';
import userService from '../services/usersService';
import { AiFillCheckCircle } from 'react-icons/ai';
import { BiCircle } from 'react-icons/bi';

const BadgesAssignment = (props) => {
  const defaultSelectionUsers = {
    usuarioId: 0,
    sesionId: props.sessionId,
    insigniaId: 0,
    isFavorite: true,
  };
  const defaultBadgeInfo = {
    nombre: '',
    descripcion: '',
    tipoInsigniaId: 1,
    imagenesInsignias: 0,
    estadoId: 1,
    creadoPor: 0,
    fechaCreacion: new Date(),
    eliminado: false,
  };

  const defaultBadgeAssign = {
    usuarioId: 0,
    sesionId: props.sessionId,
    insigniaId: 0,
    isFavorite: true,
  };

  const [isCreation, setIsCreation] = useState(false);
  const [isAssignment, setIsAssignment] = useState(false);
  const [badgesImages, setBadgesImages] = useState([]);
  const [selectionUser, setSelectionUser] = useState(defaultSelectionUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [badgeInfo, setBadgeInfo] = useState({ ...defaultBadgeInfo });
  const [isLoading, setIsLoading] = useState(true);
  const [areSessionUsersLoading, setAreSessionUsersLoading] = useState(false);
  const [sessionUsers, setSessionUsers] = useState([]);
  const [sessionUsersRecordsTotal, setSessionUsersRecordsTotal] = useState(0);
  const [selectedSessionUsersPage, setSelectedSessionUsersPage] = useState(1);
  const [myBadges, setMyBadges] = useState([]);
  const sessionUsersPageSize = 10;

  const getBadgesImages = async () => {
    try {
      const result = await badgesService.getImagenesInsignias();
      if (result) {
        console.log(result.data);
        setBadgesImages(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfUsuariosSesionesContains = (studentId) => {
    if (studentId === selectionUser.usuarioId) {
      return true;
    } else {
      return false;
    }
  };

  const handleImgSelection = (imgId) => {
    setBadgeInfo({
      ...badgeInfo,
      imagenesInsignias: imgId,
    });
  };

  const handleBadgeSelection = (badgeId) => {
    setSelectionUser({ ...selectionUser, insigniaId: badgeId });
  };

  const getSessionUsers = async (selectedPage, pageSize, sessionId) => {
    try {
      const response = await userService.getPaginatedSessionStudents(
        selectedSessionUsersPage,
        sessionUsersPageSize,
        props.sessionId
      );
      console.log(response);
      setSessionUsers(response.data.records);
      setSessionUsersRecordsTotal(response.data.recordsTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const validateFields = () => {
    if (
      !validationService.isNullOrWhiteSpace(badgeInfo.nombre) &&
      !validationService.isNullOrWhiteSpace(badgeInfo.descripcion)
    ) {
      if (badgeInfo.imagenesInsignias !== 0) {
        return true;
      } else {
        alert('Por favor seleccione una imagen de insignia');
        return false;
      }
    } else {
      alert('Algunos de los campos estan vacios');
      return false;
    }
  };

  const validateBadgeAssignFields = () => {
    if (selectionUser.usuarioId === 0) {
      alert('Por favor, seleccione un estudiante');
      return false;
    }

    if (selectionUser.insigniaId === 8) {
      alert('Por favor, seleccione una insignia');
      return false;
    }

    return true;
  };

  const handleSubmitBadgeCreation = async (e) => {
    e.preventDefault();
    try {
      if (validateFields()) {
        const response = await badgesService.saveBadge(badgeInfo);
        console.log(badgeInfo);
        if (response) {
          alert('La insignia ha sido creada satisfactoriamente');
          returnToMain();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBadgeAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateBadgeAssignFields()) {
        const response = await badgesService.assignBadgeToStudent(
          selectionUser
        );

        if (response) {
          alert('La insignia ha sido asignada satisfactoriamente');
          returnToMain();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const returnToMain = () => {
    setBadgeInfo({ ...defaultBadgeInfo });
    setSelectionUser(defaultSelectionUsers);

    setIsCreation(false);
    setIsAssignment(false);
    setSelectionUser({ ...defaultSelectionUsers });
    setSelectedUser(null);
  };

  const handleBadgeNameChange = (e) => {
    const badgeName = e.target.value;

    setBadgeInfo({
      ...badgeInfo,
      nombre: badgeName,
    });
  };

  const handleBadgeDescriptionChange = (e) => {
    const badgeDescription = e.target.value;

    setBadgeInfo({
      ...badgeInfo,
      descripcion: badgeDescription,
    });
  };

  const openBadgeCreation = () => {
    setIsCreation(!isCreation);
  };

  const getMyBadges = async () => {
    try {
      const result = await badgesService.getMyCreatedInsignias();

      if (result) {
        console.log(result);
        setMyBadges(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openBadgeAssignment = async () => {
    setIsAssignment(true);
    setAreSessionUsersLoading(true);
    getSessionUsers();
    getMyBadges();
    setAreSessionUsersLoading(false);
  };

  const handlePageChange = (selectedPage) => {
    setAreSessionUsersLoading(true);
    setSelectedSessionUsersPage(selectedPage);
    getSessionUsers(
      selectedSessionUsersPage,
      sessionUsersPageSize,
      props.sessionId
    );
    setAreSessionUsersLoading(false);
  };

  const handleUserSelection = (user) => {
    if (user) {
      setSelectedUser(user);
      setSelectionUser({ ...selectionUser, usuarioId: user.id });
    }
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await getBadgesImages();
      setIsLoading(false);
      console.log(props.sessionId);
    };
    init();
  }, []);

  return (
    <div className="bg-light py-3 px-3">
      {badgesImages.length > 0 ? (
        isCreation ? (
          <form className="form" onSubmit={handleSubmitBadgeCreation}>
            <div>
              <div className="d-flex flex-row mb-3">
                <button
                  className="me-3 btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    returnToMain();
                  }}
                >
                  <IoMdArrowBack size={20} />
                </button>
                <button className="btn btn-success flex-grow-1">
                  Crear insignia
                </button>
              </div>

              <div className="form-group mb-3">
                <input
                  type="text"
                  name="nombre-insignia"
                  id="nombre-insignia"
                  autoComplete="off"
                  minLength="2"
                  maxLength="100"
                  value={badgeInfo.nombre}
                  onChange={handleBadgeNameChange}
                  required
                />
                <label htmlFor="nombre-insignia" className="label-top">
                  <span className="label-content">Nombre de insignia</span>
                </label>
                <div className="underline"></div>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Leave a comment here"
                  minLength={5}
                  maxLength={250}
                  id="floatingTextarea2"
                  value={badgeInfo.descripcion}
                  onChange={handleBadgeDescriptionChange}
                ></textarea>
                <label htmlFor="floatingTextarea2">Descripción</label>
              </div>
              <Row xs={3} md={6} lg={10}>
                {badgesImages &&
                  badgesImages.map((image, index) => (
                    <Col key={index} className="mb-3">
                      <Card
                        className={
                          badgeInfo.imagenesInsignias === image.id
                            ? 'pointer-cursor border-5 border-success'
                            : 'pointer-cursor border-5'
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleImgSelection(image.id);
                        }}
                      >
                        <Card.Img
                          height={50}
                          src={image.contenidoSvg}
                        ></Card.Img>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </form>
        ) : isAssignment ? (
          <form className="form" onSubmit={handleBadgeAssignSubmit}>
            <div>
              <div className="d-flex flex-row mb-3">
                <button
                  className="me-3 btn btn-success"
                  onClick={(e) => {
                    e.preventDefault();
                    returnToMain();
                  }}
                >
                  <IoMdArrowBack size={20} />
                </button>
                <button className="btn btn-success flex-grow-1">
                  Asignar insignia
                </button>
              </div>
              {areSessionUsersLoading ? <LoadingIcon /> : null}
              <div>
                <div>
                  {selectedUser && selectionUser.userId !== 0 ? (
                    <>
                      <h5 className="text-center">Usuario seleccionado:</h5>
                      <p className="text-center fw-bold">
                        {selectedUser.nombres} {selectedUser.apellidos}
                      </p>
                    </>
                  ) : null}
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Código</th>
                      <th>Nombre</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionUsers &&
                      sessionUsers.map((user) => (
                        <tr
                          key={user.id}
                          onClick={(e) => {
                            e.preventDefault();
                            handleUserSelection(user);
                          }}
                        >
                          {checkIfUsuariosSesionesContains(user.id) ? (
                            <td className="text-success">
                              <AiFillCheckCircle size={25} />
                            </td>
                          ) : (
                            <td>
                              <BiCircle size={25} />
                            </td>
                          )}
                          <td>{user.codigo}</td>
                          <td>
                            {user.nombres} {user.apellidos}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination
                  actualPage={selectedSessionUsersPage}
                  recordsTotal={sessionUsersRecordsTotal}
                  pageSize={sessionUsersPageSize}
                  handlePageChange={handlePageChange}
                />
              </div>

              <Row xs={1}>
                {myBadges &&
                  myBadges.map((badge, index) => (
                    <Col key={index} className="mb-3">
                      <Card
                        className={
                          selectionUser.insigniaId === badge.id
                            ? 'pointer-cursor border-5 border-success'
                            : 'pointer-cursor border-5'
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          handleBadgeSelection(badge.id);
                        }}
                      >
                        <Card.Header>{badge.nombre}</Card.Header>
                        <Card.Img
                          className="my-3"
                          height={50}
                          src={badge.imagen}
                        ></Card.Img>
                        <Card.Footer>{badge.descripcion}</Card.Footer>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          </form>
        ) : (
          <>
            <button
              className="w-100 btn btn-success mb-3"
              onClick={(e) => {
                e.preventDefault();
                openBadgeCreation();
              }}
            >
              Crear insignias para la sesión
            </button>
            <button
              className="w-100 btn btn-success mb-3"
              onClick={(e) => {
                e.preventDefault();
                openBadgeAssignment();
              }}
            >
              Asignar insignias a estudiantes
            </button>
            {badgesImages &&
              badgesImages.map((badgeImage, index) => (
                <img
                  height={50}
                  key={index}
                  alt="Badge"
                  src={`${badgeImage.contenidoSvg}`}
                />
              ))}
          </>
        )
      ) : (
        <h1 className="text-center">No se pudieron encontrar insignias</h1>
      )}
    </div>
  );
};

export default BadgesAssignment;
