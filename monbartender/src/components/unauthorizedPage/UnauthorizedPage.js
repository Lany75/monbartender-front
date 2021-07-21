import React from 'react';

import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <div className='unauthorized-page'>
      <h1>ACCES NON AUTORISE</h1>
      <p>Vous n'avez pas les droits d'administrateur</p>
    </div>
  )
}

export default UnauthorizedPage;