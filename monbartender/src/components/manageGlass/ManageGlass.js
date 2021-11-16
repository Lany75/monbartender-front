import React from 'react';

import GlassAdd from '../glassAdd/GlassAdd';
import GlassList from '../glassList/GlassList';
import './ManageGlass.css';

const ManageGlass = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className='manage-glass'>
      <GlassAdd setMessage={setMessage} />
      <GlassList />
    </div>
  )
}

export default ManageGlass;