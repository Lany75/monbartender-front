import React, { useState } from 'react';

import IngredientList from '../ingredientList/IngredientList';
import IngredientChange from '../ingredientChange/IngredientChange';
import IngredientAdd from '../ingredientAdd/IngredientAdd';
import IngredientCategoryList from '../ingredientCategoryList/IngredientCategoryList';
import IngredientCategoryAdd from '../ingredientCategoryAdd/IngredientCategoryAdd';

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
        <h4>LES CATEGORIES D'INGREDIENT</h4>
        <IngredientCategoryList />
        <div>Modif / Supp catégorie d'ingrédient</div>
        <IngredientCategoryAdd />
      </div>
    </div>
  )
}

export default ManageIngredients;