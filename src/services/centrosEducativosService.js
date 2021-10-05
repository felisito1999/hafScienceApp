import axios from 'axios';

let centrosEducativosService = {};

centrosEducativosService.getAll = async () => {
    const config = {
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}centroseducativos`,
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: null,
    };

    try {
        const response = await axios(config);

        return response;
    } catch (error) {
        console.log(error);
    }
};

export default centrosEducativosService;
