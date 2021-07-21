import React, { useState } from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { IngredientContext } from '../../context/ingredientContext';

import './IngredientCategoryAdd.css';

const IngredientCategoryAdd = () => {
  const { accessToken } = React.useContext(AuthContext);
  const { setListeCategoriesIngredients } = React.useContext(IngredientContext);
  const [ingredientCategoryName, setIngredientCategoryName] = useState('');

  const addCategory = event => {
    event.preventDefault();

    if (ingredientCategoryName !== '') {
      Axios.post(`${apiBaseURL}/api/v2/ingredients/category`,
        { nom: ingredientCategoryName },
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setListeCategoriesIngredients(reponse.data);
          setIngredientCategoryName('');
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  return (
    <div className='ingredient-category-add'>
      <h4>AJOUT D'UNE CATEGORIE D'INGREDIENT</h4>
      <form className='form-ingredient-category-add' onSubmit={addCategory}>
        <div id='ingredient-category-add-name'>
          <TextField
            variant='outlined'
            margin='normal'
            label='Nom'
            name='ingredientCategoryName'
            value={ingredientCategoryName}
            onChange={event => setIngredientCategoryName(event.target.value)}
          />
        </div>
        <div id='ingredient-category-add-btn'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Ajouter
          </Button>
        </div>
      </form>
    </div>
  )
}

export default IngredientCategoryAdd;