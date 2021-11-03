import React from "react";
import './CocktailAddChosenImage.css';
import ImageCocktail from "../imageCocktail/ImageCocktail";

const CocktailAddChosenImage = ({ chosenImage, refChosenImage }) => {
  return (
    !chosenImage ? (
      <ImageCocktail classe='manage-cocktail-img' reference={refChosenImage} />
    ) : (
      <img src={chosenImage} alt='le cocktail' className='manage-cocktail-img' />
    )
  )
}

export default CocktailAddChosenImage;