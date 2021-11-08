import React from "react";
import './CocktailChosenImage.css';
import ImageCocktail from "../imageCocktail/ImageCocktail";

const CocktailChosenImage = ({ chosenImage, refChosenImage }) => {
  return (
    !chosenImage ? (
      <ImageCocktail classe='manage-cocktail-img' reference={refChosenImage} />
    ) : (
      <img src={chosenImage} alt='le cocktail' className='manage-cocktail-img' />
    )
  )
}

export default CocktailChosenImage;