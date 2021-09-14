import React from 'react';
import UnityAdd from '../unityAdd/UnityAdd';
import UnityList from '../unityList/UnityList';

import './ManageUnities.css';

const ManageUnities = () => {
  return (
    <div className='manage-unities'>
      <UnityAdd />
      <UnityList />
    </div>
  )
}

export default ManageUnities;