import React from 'react';

import DisplayError from '../displayError/DisplayError';
import ImageCocktail from "../imageCocktail/ImageCocktail";
import './CocktailsCard.css';

const CocktailsCard = ({ cocktail }) => {

  return (
    <> {
      cocktail ? (
        <div className='cocktail-card'>
          <ImageCocktail
            classe='cocktail-card-image'
            reference={cocktail.photo}
            nom={cocktail.nom}
          />
          <p className='cocktail-card-name'>{cocktail.nom}</p>
        </div>
      ) : (
        <DisplayError classe='cocktail-card' componentName='CocktailsCard' />
      )}
    </>
  )
}

export default CocktailsCard;