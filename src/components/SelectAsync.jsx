import React, { useEffect, useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const SelectAsync = (props) => {
    const [inputValue, setInputValue] = useState('Todos');
    const [selectedValue, setSelectedValue] = useState(null);

    const handleInputChange = (value) => {
        setInputValue(value);
    };

    const handleChange = (value) => {
        setSelectedValue(value);
        props.handleSchoolChange(value);

    };

    const defaultOptions = [{
        id: null,
        nombre: 'Todos'
    }]

    const loadSchools = async (inputValue) => {
        const config = {
            url: `${process.env.REACT_APP_API_URL}centroseducativos`,
            method: 'get',
            params: {
                name: inputValue
            },
            headers: {},
            data: null,
        };

        try {
            return await (
                await axios(config)
            ).data;
        } catch (error) {
            console.log(error);
            return error;
        }
    };
    return (
        <div>
            <AsyncSelect
                defaultInputValue={defaultOptions[0].nombre}
                defaultValue={null}
                defaultOptions={defaultOptions}
                cacheOptions
                value={selectedValue}
                getOptionLabel={(e) => e.nombre}
                getOptionsValue={(e) => e.id}
                loadOptions={loadSchools}
                onInputChange={handleInputChange}
                onChange={handleChange}
            />
        </div>
    );
};

export default SelectAsync;
