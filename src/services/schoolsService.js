import axios from 'axios';

let schoolsService = {};

schoolsService.getAll = async () => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos/getall`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.getAllPaginatedSchools = async (page, pageSize) => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        method: 'get',
        params: {
            page: page,
            pageSize: pageSize,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.getAllPaginatedSchoolsBy = async (
    pageNumber,
    pageSize,
    searchParameters
) => {
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        params: {
            page: pageNumber,
            pageSize: pageSize,
            ...searchParameters,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.loadByName = async (name) => {
    const config = {
        url: `${process.env.REACT_APP_API_URL}centroseducativos/getByName`,
        method: 'get',
        params: {
            name: name,
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

schoolsService.saveSchool = async (school) => {
    const config = {
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: school,
    };

    try {
        const response = await axios(config);

        return response;
    } catch (error) {
        console.log(error);
    }
};

export default schoolsService;
