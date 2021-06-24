import React from 'react';

import ImageCocktail from "../imageCocktail/ImageCocktail";
import './CocktailsCard.css';

const CocktailsCard = ({ cocktail }) => {

  return (
    <div className='cocktail-card'>
      <ImageCocktail
        classe='cocktail-card-image'
        reference={cocktail.photo}
        nom={cocktail.nom}
      />
      <p className='cocktail-card-name'>{cocktail.nom}</p>
    </div>)
}

export default CocktailsCard;