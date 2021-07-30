import React from 'react';

import IngredientSearchForm from '../ingredientSearchForm/IngredientSearchForm';

const IngredientSearch = () => {

  return (
    <>
      <IngredientSearchForm />
      <div className='ingredient-search-result'></div>
    </>
  )
}

export default IngredientSearch;