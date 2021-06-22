import React from 'react';
import { Button } from '@material-ui/core';

import './RandomCocktailModifButton.css';
import './RandomCocktailModifButtonDesktop.css';


const RandomCocktailModifButton = ({ otherCocktail }) => {
  return (
    <div className='random-cocktail-modif-button'>
      <Button
        variant='contained'
        color='primary'
        onClick={otherCocktail}
      >
        Un autre !!
      </Button>
    </div>
  )
}

export default RandomCocktailModifButton;