import React from 'react';
import UnityAdd from '../unityAdd/UnityAdd';
import UnityList from '../unityList/UnityList';

import './ManageUnities.css';

const ManageUnities = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className='manage-unities'>
      <h4>LES UNITES DE QUANTITE</h4>
      <UnityAdd setMessage={setMessage} />
      <UnityList message={message} setMessage={setMessage} />
    </div>
  )
}

export default ManageUnities;