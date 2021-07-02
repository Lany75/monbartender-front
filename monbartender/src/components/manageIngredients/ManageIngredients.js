import React, { useState } from 'react';

import IngredientList from '../ingredientList/IngredientList';
import IngredientChange from '../ingredientChange/IngredientChange';
import IngredientAdd from '../ingredientAdd/IngredientAdd';

import './ManageIngredients.css';

const ManageIngredients = () => {
  const [ingredientClicked, setIngredientClicked] = useState();

  return (
    <div className='manage-ingredients'>
      <div className='ingredients'>
        <h4>LES INGREDIENTS</h4>
        <IngredientList setIngredientClicked={setIngredientClicked} />
        <IngredientChange ingredient={ingredientClicked} />
        <IngredientAdd />
      </div>
      <div className='categories-ingredients'>
        <div>Liste catégories d'ingrédients</div>
        <div>Modif / Supp catégorie d'ingrédient</div>
        <div>Ajout catégorie d'ingrédient</div>
      </div>
    </div>
  )
}

export default ManageIngredients;