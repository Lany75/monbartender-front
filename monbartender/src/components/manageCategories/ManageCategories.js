import React from 'react';

import IngredientCategoryList from '../ingredientCategoryList/IngredientCategoryList';
import IngredientCategoryAdd from '../ingredientCategoryAdd/IngredientCategoryAdd';
import './ManageCategories.css';

const ManageCategories = () => {
  const [message, setMessage] = React.useState('');

  return (
    <div className='manage-categories'>
      <IngredientCategoryAdd setMessage={setMessage} />
      <IngredientCategoryList message={message} setMessage={setMessage} />
    </div>
  )
}

export default ManageCategories;