import React, { useState } from 'react';
import GlassAdd from '../glassAdd/GlassAdd';
import GlassChange from '../glassChange/GlassChange';

import GlassList from '../glassList/GlassList';

import './ManageGlass.css';

const ManageGlass = () => {
  const [glassClicked, setGlassClicked] = useState();

  return (
    <div className='manage-glass'>
      <h4>LES VERRES</h4>
      <GlassList setGlassClicked={setGlassClicked} />
      <GlassChange glass={glassClicked} setGlass={setGlassClicked} />
      <GlassAdd />
    </div>
  )
}

export default ManageGlass;