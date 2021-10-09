import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const LoadingIcon = () => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <AiOutlineLoading3Quarters
                size={50}
                className="rotating-icon m-5"
            />
        </div>
    );
};

export default LoadingIcon;
