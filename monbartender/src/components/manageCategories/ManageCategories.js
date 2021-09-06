import React /*, { useState }*/ from 'react';

import IngredientCategoryList from '../ingredientCategoryList/IngredientCategoryList';
import IngredientCategoryAdd from '../ingredientCategoryAdd/IngredientCategoryAdd';

import './ManageCategories.css';
//import IngredientCategoryChange from '../ingredientCategoryChange/IngredientCategoryChange';

const ManageCategories = () => {
  //const [categoryClicked, setCategoryClicked] = useState();
  const [message, setMessage] = React.useState('');

  return (
    <div className='manage-categories'>
      <IngredientCategoryAdd setMessage={setMessage} />
      <IngredientCategoryList message={message} setMessage={setMessage} /*setCategoryClicked={setCategoryClicked} */ />
      {/*<IngredientCategoryChange category={categoryClicked} setCategory={setCategoryClicked} />*/}
    </div>
  )
}

export default ManageCategories;