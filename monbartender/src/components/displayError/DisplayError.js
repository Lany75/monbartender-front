import React from 'react';

const DisplayError = ({ classe = 'default-class', componentName = 'Ce composant' }) => {
  return (
    <p className={classe}>
      {componentName} ne peut pas être affiché
    </p>
  )
}

export default DisplayError;