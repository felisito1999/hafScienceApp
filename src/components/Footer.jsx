import React from 'react';
import '../styles/Footer.css';

const Footer = (props) => {
    return (
        <footer className="footer d-flex flex-column w-100 p-3">
            <p className="text-center mb-0">
                Copyright &copy; <span>2021</span> HAF SCIENCE | Designed by HAF
            </p>
            <div className="text-center">
                Iconos diseñados por{' '}
                <a href="https://www.freepik.com" title="Freepik">
                    Freepik
                </a>{' '}
                from{' '}
                <a href="https://www.flaticon.es/" title="Flaticon">
                    www.flaticon.es
                </a>
            </div>
        </footer>
    );
};

export default Footer;
