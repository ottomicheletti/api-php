import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const { pathname } = useLocation();

  return (
    <nav id='navbar'>
      <div id='navbar-title'>
        <h1>Loja do Mirante</h1>
      </div>
      <div id='navbar-menu'>
        <Link
          className={`${pathname === '/venda' ? 'navbar-item active' : 'navbar-item'}`}
          to='/venda'
        >
          Vendas
        </Link>
        <Link
          className={`${pathname === '/produtos' ? 'navbar-item active' : 'navbar-item'}`}
          to='/produtos'
        >
          Produtos
        </Link>
        <Link
          className={`${pathname === '/tipos' ? 'navbar-item active' : 'navbar-item'}`}
          to='/tipos'
        >
          Tipos de Produtos
        </Link>
        <Link
          className={`${
            pathname === '/relatorio' ? 'navbar-item active' : 'navbar-item'
          }`}
          to='/relatorio'
        >
          Relatório
        </Link>
      </div>
    </nav>
  );
}

export default Header;
