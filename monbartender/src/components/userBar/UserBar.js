import React from 'react';

import UserBarIngredientAdd from '../userBarIngredientAdd/UserBarIngredientAdd';
import UserBarIngredientList from '../userBarIngredientList/UserBarIngredientList';
import './UserBar.css';

const UserBar = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className='user-bar'>
      <UserBarIngredientAdd setMessage={setMessage} />
      <UserBarIngredientList message={message} setMessage={setMessage} />
    </div>
  )
}

export default UserBar;