import React, { useState } from 'react';

import IngredientCategoryList from '../ingredientCategoryList/IngredientCategoryList';
import IngredientCategoryAdd from '../ingredientCategoryAdd/IngredientCategoryAdd';

import './ManageCategories.css';
import IngredientCategoryChange from '../ingredientCategoryChange/IngredientCategoryChange';

const ManageCategories = () => {
  const [categoryClicked, setCategoryClicked] = useState();

  return (
    <div className='manage-categories'>
      <h4>LES CATEGORIES D'INGREDIENTS</h4>
      <IngredientCategoryList setCategoryClicked={setCategoryClicked} />
      <IngredientCategoryChange category={categoryClicked} setCategory={setCategoryClicked} />
      <IngredientCategoryAdd />
    </div>
  )
}

export default ManageCategories;