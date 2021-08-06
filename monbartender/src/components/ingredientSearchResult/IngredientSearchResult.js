import React from 'react';

import CocktailCard from '../cocktailCard/CocktailCard';

const IngredientSearchResult = ({ cocktails }) => {
  return (
    <div className='search-result'>
      <p className='result-title'>{cocktails.length} resultat(s) pour votre recherche</p>
      <div className='result-cocktails'>
        {cocktails && (cocktails.map(cocktail => {
          return (<CocktailCard cocktail={cocktail} key={cocktail.id} />)
        }))}
      </div>
    </div>
  )
}

export default IngredientSearchResult;