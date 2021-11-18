import React from 'react';

import './ManageIngredients.css';
import IngredientList from '../ingredientList/IngredientList';

const ManageIngredients = () => {
  return (
    <div className='manage-ingredients'>
      <h4>LES INGREDIENTS</h4>
      <IngredientList />
    </div>
  )
}

export default ManageIngredients;