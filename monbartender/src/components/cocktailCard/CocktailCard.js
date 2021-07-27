import React from 'react';
import { Link } from 'react-router-dom';
import ImageCocktail from "../imageCocktail/ImageCocktail";
import './CocktailCard.css';

const CocktailCard = ({ cocktail }) => {
  const to = `/cocktail/${cocktail?.id}`;

  return (
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
  )
}

export default CocktailCard;