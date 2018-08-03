import React from 'react';
import PropTypes from 'prop-types';

const Spinner = (props) => {
  if (!props.hide) {
    return (
      <div className="overlay" />
    );
  }
  return null;
};

Spinner.propTypes = {
  hide: PropTypes.bool.isRequired,
};

export default Spinner;
