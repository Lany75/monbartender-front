import React from 'react';
import IngredientList from '../ingredientList/IngredientList';

import './ManageIngredients.css';

const ManageIngredients = () => {

  return (
    <div className='manage-ingredients'>
      <div className='ingredients'>
        <h4>LES INGREDIENTS</h4>
        <IngredientList />
        <div>Modif / Supp ingrédient</div>
        <div>Ajout ingrédient</div>
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