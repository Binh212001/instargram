import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className='grid grid-1-4  '>
      <Sidebar />

      <div>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
