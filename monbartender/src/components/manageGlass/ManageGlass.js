import React from 'react';

import GlassAdd from '../glassAdd/GlassAdd';
import GlassList from '../glassList/GlassList';
import './ManageGlass.css';

const ManageGlass = () => {
  return (
    <div className='manage-glass'>
      <GlassAdd />
      <GlassList />
    </div>
  )
}

export default ManageGlass;