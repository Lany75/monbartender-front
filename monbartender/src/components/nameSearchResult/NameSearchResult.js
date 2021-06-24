import React from 'react';

import CocktailCard from '../cocktailCard/CocktailCard';
import './NameSearchResult.css';

const NameSearchResult = ({ cocktailName, cocktails }) => {
  return (
    <div className='search-result'>
      <span className='result-title'>{cocktails.length} resultat(s) pour {cocktailName.toUpperCase()}</span>
      <div className='result-cocktails'>
        {cocktails && (cocktails.map(cocktail => {
          return (<CocktailCard cocktail={cocktail} key={cocktail.id} />)
        }))}
      </div>
    </div>
  )
}

export default NameSearchResult;