import React from 'react';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import './BarIngredient.css';

const BarIngredient = ({ ingredient }) => {
  return (
    <div className='bar-ingredient'>
      <p className='ingredient-name'>{ingredient.nom}</p>
      <DeleteForeverIcon />
    </div>
  )
}

export default BarIngredient;