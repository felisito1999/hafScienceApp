import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;
const authToken = localStorage.getItem('token');

let userService = {};

userService.getAllPaginatedUsers = async (page, pageSize){
    const config = {
        url: `${apiUrl}usuarios`,
        parameters: {
            page: page, 
            pageSize: pageSize
        },
        method: 'get',
        headers: {
            'content': 'application/json',
            'Authorize': `Bearer ${authToken}`
        }
    }

    try {
        const response = await axios(config);

        return response;
    } catch (error) {
        console.log(error); 
        if(error.response){
            return error.response.status;
        }
        
        return 500; 
    }
}