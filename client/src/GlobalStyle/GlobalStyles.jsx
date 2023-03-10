import React from 'react';
import PropTypes from 'prop-types';
import './GlobalStyle.scss';

function GlobalStyles({ children }) {
  return <div>{children}</div>;
}

GlobalStyles.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlobalStyles;
