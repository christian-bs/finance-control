import React from 'react';

const Header = ({ children }) => {
    return (
        <div className="container center">
            <h3> Bootcamp Full Stack - Desafio Final</h3>
            <h5>Controle Financeiro Pessoal</h5>
            {children}
        </div>
    );
};

export default Header;
