import React /*, { useState }*/ from 'react';

import IngredientList from '../ingredientList/IngredientList';
//import IngredientChange from '../ingredientChange/IngredientChange';
import IngredientAdd from '../ingredientAdd/IngredientAdd';

import './ManageIngredients.css';

const ManageIngredients = () => {
  //const [ingredientClicked, setIngredientClicked] = useState();
  const [message, setMessage] = React.useState('');


  return (
    <div className='manage-ingredients'>
      <IngredientAdd setMessage={setMessage} />
      <IngredientList message={message} setMessage={setMessage}/*setIngredientClicked={setIngredientClicked} */ />
      {/*<IngredientChange ingredient={ingredientClicked} setIngredient={setIngredientClicked} />*/}
    </div>
  )
}

export default ManageIngredients;