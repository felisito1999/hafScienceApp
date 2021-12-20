import axios from 'axios'; 

const apiHost = process.env.REACT_APP_API_URL;

let badgesService = {};

badgesService.getBadges = async () => {

};

badgesService.saveBadge = async (badgeInfo) => {
  const config = {
    method: 'post',
    url: `${apiHost}badges/save-badge`,
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: badgeInfo
  }

  try {
    const response = await axios(config);
    
    return response;
  } catch (error) {
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}

badgesService.getImagenesInsignias = async () => {
  const config = {
    method: 'get',
    url: `${apiHost}badges/imagenes-insignias`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: null
  }

  try {
    const response = await axios(config);
    
    return response;
  } catch (error) {
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}

badgesService.getMyCreatedInsignias = async () => {
  const config = {
    method: 'get',
    url: `${apiHost}badges/get-my-created-badges`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: null
  }

  try {
    const response = await axios(config);
    
    return response;
  } catch (error) {
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}

badgesService.assignBadgeToStudent =  async (assignBadgeModel) => {
  const config = {
    method: 'post',
    url: `${apiHost}badges/assign-badge`,
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: assignBadgeModel
  }

  try {
    const response = await axios(config);
    
    return response;
  } catch (error) {
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}

badgesService.getUserFavoriteBadge = async (userId, sessionId) => {
  const config = {
    method: 'get',
    params: {
      studentId: userId, 
      sessionId: sessionId
    },
    url: `${apiHost}badges/assign-badge`,
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: null
  }

  try {
    const response = await axios(config);
    
    return response;
  } catch (error) {
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}

badgesService.getStudentBadges = async (sessionId) => {
  const config = {
    method: 'get',
    params: {
      sessionId: sessionId
    },
    url: `${apiHost}badges/get-student-badges`,
    headers: {
      "Content-Type": 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    data: null
  }

  try {
    const response = await axios(config);
    
    return response;
  } catch (error) {
    if(error.response){
      if (error.response.data.message){
        alert(error.response.data.message);
      }
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
}
export default badgesService;