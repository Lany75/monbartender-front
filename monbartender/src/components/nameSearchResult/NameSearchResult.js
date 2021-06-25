import React from 'react';

import DisplayError from '../displayError/DisplayError';
import CocktailCard from '../cocktailCard/CocktailCard';
import './NameSearchResult.css';

const NameSearchResult = ({ cocktailName, cocktails }) => {
  return (
    <>
      {cocktailName && cocktails ? (
        <div className='search-result'>
          <p className='result-title'>{cocktails.length} resultat(s) pour {cocktailName.toUpperCase()}</p>
          <div className='result-cocktails'>
            {cocktails && (cocktails.map(cocktail => {
              return (<CocktailCard cocktail={cocktail} key={cocktail.id} />)
            }))}
          </div>
        </div>
      ) : (
        <DisplayError classe='search-result' componentName='NameSearchResult' />
      )}
    </>
  )
}

export default NameSearchResult;