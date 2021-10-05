import axios from 'axios';

let schoolsService = {}; 

schoolsService.getAllPaginatedSchools = async (page, pageSize) => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        method: 'get',
        parameters: {
            page: page,
            pageSize: pageSize 
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: null
    };
    
    try {
        const response = await axios(config);
        return response.data 
    } catch (error) {
        console.log(error);
    }
}
schoolsService.loadByName = async (name) => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        method: 'get',
        params: {
            name: name
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        data: null,
    };

    try {
        const response = await axios(config);

        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export default schoolsService;