import React from 'react';
import '../styles/Forms.css';

const SignUp = (props) => {
    return (
        <section className="form-container">
            <h1>Registrate y</h1>
            <form action="" className="form">
                <div className="form-group">
                    <input type="text" />
                    <label htmlFor="">
                        <span className="label-content">Nombre:</span>
                    </label>
                </div>
            </form>
        </section>
    );
};

export default SignUp;
