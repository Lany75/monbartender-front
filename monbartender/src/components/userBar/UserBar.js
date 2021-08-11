import React from 'react';

import UserBarIngredientAdd from '../userBarIngredientAdd/UserBarIngredientAdd';
import UserBarIngredientList from '../userBarIngredientList/UserBarIngredientList';
import './UserBar.css';

const UserBar = () => {
  return (
    <div className='user-bar'>
      <UserBarIngredientAdd />
      <UserBarIngredientList />
    </div>
  )
}

export default UserBar;