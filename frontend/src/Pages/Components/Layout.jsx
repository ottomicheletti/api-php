import React from 'react';
import Header from './Header';

function Layout({ children }) {
  return (
    <div className='container'>
      <Header />
      <div>{children}</div>
    </div>
  );
}

export default Layout;
