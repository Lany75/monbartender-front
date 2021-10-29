import React from 'react';
import { Button } from '@material-ui/core';
import './CocktailAdd.css';
import CocktailAddNameType from '../cocktailAddNameType/CocktailAddNameType';
import CocktailAddPhoto from '../cocktailAddPhoto/CocktailAddPhoto';
import CocktailAddGlass from '../cocktailAddGlass/CocktailAddGlass';
import CocktailAddIngredients from '../cocktailAddIngredients/CocktailAddIngredients';
import CocktailAddSteps from '../cocktailAddSteps/CocktailAddSteps';

const CocktailAdd = () => {
  const addCocktail = (event) => {
    event.preventDefault();
  }

  return (
    <div className='cocktail-add'>
      <div className='cocktail-add-title'>Ajout d'un cocktail</div>
      <form className='form-cocktail-add' onSubmit={addCocktail}>
        <CocktailAddNameType />
        <CocktailAddPhoto />
        <CocktailAddGlass />
        <CocktailAddIngredients />
        <CocktailAddSteps />
        <Button
          style={{ marginTop: 50 }}
          type='submit'
          variant='contained'
          color='primary'
        >
          Créer le cocktail
        </Button>
      </form>
    </div>
  )
}

export default CocktailAdd;
