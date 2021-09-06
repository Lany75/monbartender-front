import React from 'react';

import IngredientList from '../ingredientList/IngredientList';
import IngredientAdd from '../ingredientAdd/IngredientAdd';

import './ManageIngredients.css';

const ManageIngredients = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className='manage-ingredients'>
      <IngredientAdd setMessage={setMessage} />
      <IngredientList message={message} setMessage={setMessage} />
    </div>
  )
}

export default ManageIngredients;