import React from 'react';
import Header from './Header';
import './Layout.css';
import Message from './Message';

function Layout({ children }) {
  return (
    <div id='layout'>
      <Header />
      {children}
      <Message />
    </div>
  );
}

export default Layout;
