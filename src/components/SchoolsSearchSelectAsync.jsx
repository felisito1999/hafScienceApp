import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import schoolsService from '../services/schoolsService';

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

  const defaultOptions = [
    {
      id: null,
      nombre: 'Todos',
    },
  ];

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
        loadOptions={schoolsService.loadByName}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </div>
  );
};

export default SelectAsync;
