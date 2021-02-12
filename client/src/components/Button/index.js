import React from 'react';

const Button = ({ children, icon, onClick }) => {
    const handleClick = () => {
        onClick();
    };
    return (
        <a onClick={handleClick} className="btn col s3 l3" href="#!">
            <i className="material-icons left">{icon}</i>
            {children}
        </a>
    );
};

export default Button;
