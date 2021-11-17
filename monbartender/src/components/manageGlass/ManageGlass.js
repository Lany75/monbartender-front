import React from 'react';

import './ManageGlass.css';
import GlassList from '../glassList/GlassList';

const ManageGlass = () => {
  return (
    <div className='manage-glass'>
      <h4>LES VERRES</h4>
      <GlassList />
    </div>
  )
}

export default ManageGlass;