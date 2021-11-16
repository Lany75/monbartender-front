import React from 'react';

import IngredientList from '../ingredientList/IngredientList';
import IngredientAdd from '../ingredientAdd/IngredientAdd';

import './ManageIngredients.css';

const ManageIngredients = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className='manage-ingredients'>
      <h4>LES INGREDIENTS</h4>
      <IngredientAdd setMessage={setMessage} />
      <IngredientList message={message} setMessage={setMessage} />
    </div>
  )
}

export default ManageIngredients;