import React from 'react';
import { Link } from 'react-router-dom';

import DisplayError from '../displayError/DisplayError';
import ImageCocktail from "../imageCocktail/ImageCocktail";
import './CocktailsCard.css';

const CocktailsCard = ({ cocktail }) => {
  const to = `/cocktail/${cocktail?.id}`;

  return (
    <> {
      cocktail ? (
        <Link
          className='cocktail-card'
          to={to}
          style={{ textDecoration: "none", color: "black" }}
        >
          <ImageCocktail
            classe='cocktail-card-image'
            reference={cocktail.photo}
            nom={cocktail.nom}
          />
          <p className='cocktail-card-name'>{cocktail.nom}</p>
        </Link>
      ) : (
        <DisplayError classe='cocktail-card' componentName='CocktailsCard' />
      )}
    </>
  )
}

export default CocktailsCard;