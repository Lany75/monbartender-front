import React from 'react';
import ImageCocktail from "../imageCocktail/ImageCocktail";

import './RecipePage.css';
import './RecipePageDesktop.css';

const RecipePage = ({ cocktail }) => {

  return (
    <div className='recipe-page'>
      <span className='cocktail-name'>{cocktail.nom.toUpperCase()}</span>
      <ImageCocktail
        classe='cocktail-image'
        reference={cocktail.photo}
        nom={cocktail.nom}
      />
      <div className='cocktail-ingredients'>
        <span className='sous-titre'>Ingrédients : </span>
        <ul>
          {cocktail.Ingredients.map(rc => {
            return (
              <li key={rc.id} className='ingredient'>
                <span>{rc.nom}</span>
                {rc.cocktails_ingredients.quantite && <span>&nbsp;({rc.cocktails_ingredients.quantite} {rc.cocktails_ingredients.unite})</span>}
              </li>
            )
          })}
        </ul>
      </div>
      <div className='cocktail-glass'>
        <span className='sous-titre'>Verre à utiliser : </span>
        <span className='glass'>{cocktail.Verre.nom}</span>
      </div>
      <div className='cocktail-steps'>
        <span className='sous-titre'>Préparation : </span>
        <ul>
          {cocktail.EtapesPreparations.map(rc => {
            return (
              <li key={rc.id} className='step'>{rc.texte}</li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default RecipePage;