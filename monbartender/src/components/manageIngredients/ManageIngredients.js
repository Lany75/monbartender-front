import React, { useState } from 'react';

import IngredientList from '../ingredientList/IngredientList';
import IngredientChange from '../ingredientChange/IngredientChange';
import IngredientAdd from '../ingredientAdd/IngredientAdd';

import './ManageIngredients.css';

const ManageIngredients = () => {
  const [ingredientClicked, setIngredientClicked] = useState();

  return (
    <div className='manage-ingredients'>
      <h4>LES INGREDIENTS</h4>
      <IngredientList setIngredientClicked={setIngredientClicked} />
      <IngredientChange ingredient={ingredientClicked} />
      <IngredientAdd />
    </div>
  )
}

export default ManageIngredients;