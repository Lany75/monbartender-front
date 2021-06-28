import React, { useEffect } from 'react';

import RecipePage from '../recipePage/RecipePage';
import RandomCocktailModifButton from '../randomCocktailModifButton/RandomCocktailModifButton';
import LoadingMessage from '../loadingMessage/LoadingMessage';
import { CocktailContext } from '../../context/cocktailContext';

const RandomCocktail = () => {
  const { listeCocktails } = React.useContext(CocktailContext);
  const [randomCocktail, setRandomCocktail] = React.useState();

  function getRandomInteger(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getRandomCocktail = () => {
    if (listeCocktails) {
      let randomInt = getRandomInteger(listeCocktails.length);
      if (listeCocktails[randomInt] !== randomCocktail) {
        setRandomCocktail(listeCocktails[randomInt]);
      } else {
        getRandomCocktail();
      }
    }
  };

  useEffect(() => {
    getRandomCocktail();
  }, [listeCocktails]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    randomCocktail ? (
      <>
        <RandomCocktailModifButton otherCocktail={getRandomCocktail} />
        <RecipePage cocktail={randomCocktail} />
        <RandomCocktailModifButton otherCocktail={getRandomCocktail} />
      </>
    ) : (
      <LoadingMessage message='Chargement ...' />
    )
  )
}

export default RandomCocktail;