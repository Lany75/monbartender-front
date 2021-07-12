import React from 'react';

import LoadingMessage from '../loadingMessage/LoadingMessage';
import CocktailCard from '../cocktailCard/CocktailCard';
import { CocktailContext } from '../../context/cocktailContext';

import './AllRecipesList.css';

const AllRecipesList = () => {
  const { listeCocktails } = React.useContext(CocktailContext);
  const alcoholCocktails = [];
  const alcoholFreeCocktails = [];

  listeCocktails && listeCocktails.forEach(cocktail => {
    if (cocktail.alcool) alcoholCocktails.push(cocktail)
    else alcoholFreeCocktails.push(cocktail);
  })

  return (
    listeCocktails ? (
      <div className='all-recipes-list'>
        <div className='all-recipes-title'>Liste des recettes avec alcool</div>
        <div className='cocktails-list'>
          {alcoholCocktails.map(cocktail => {
            return (<CocktailCard cocktail={cocktail} key={cocktail.id} />);
          })}
        </div>
        <div className='all-recipes-title'>Liste des recettes sans alcool</div>
        <div className='cocktails-list'>
          {alcoholFreeCocktails.map(cocktail => {
            return (<CocktailCard cocktail={cocktail} key={cocktail.id} />);
          })}
        </div>
      </div>
    ) : (
      <LoadingMessage message='Chargement ...' />
    )
  );
};

export default AllRecipesList;
