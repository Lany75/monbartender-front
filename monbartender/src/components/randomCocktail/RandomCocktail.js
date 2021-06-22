import React, { useContext, useEffect, useState } from 'react';

import RecipePage from '../recipePage/RecipePage';
import { CocktailContext } from '../../context/cocktailContext';

import './RandomCocktail.css';
import './RandomCocktailDesktop.css';

const RandomCocktail = () => {
  const { listeCocktails } = useContext(CocktailContext);
  const [randomCocktail, setRandomCocktail] = useState();

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
      <RecipePage cocktail={randomCocktail} />
    ) : (
      <div className='chargement-message'>Chargement ...</div>
    )
  )
}

export default RandomCocktail;