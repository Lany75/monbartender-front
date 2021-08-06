import React from 'react';

import IngredientSearchForm from '../ingredientSearchForm/IngredientSearchForm';
import IngredientSearchResult from '../ingredientSearchResult/IngredientSearchResult';

const IngredientSearch = () => {
  const [searchCocktails, setSearchCocktails] = React.useState();

  return (
    <>
      <IngredientSearchForm setSearchCocktails={setSearchCocktails} />
      {searchCocktails && <IngredientSearchResult cocktails={searchCocktails} />}
    </>
  )
}

export default IngredientSearch;