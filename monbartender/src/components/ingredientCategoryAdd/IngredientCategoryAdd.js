import React, { useState } from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { AuthContext } from '../../context/authContext';
import { IngredientContext } from '../../context/ingredientContext';
import './IngredientCategoryAdd.css';

const IngredientCategoryAdd = ({ setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeCategoriesIngredients, setListeCategoriesIngredients } = React.useContext(IngredientContext);
  const [ingredientCategoryName, setIngredientCategoryName] = useState('');

  const addCategory = event => {
    event.preventDefault();
    const name = ingredientCategoryName.replace(/\s+/g, ' ').trim();

    if (
      !(/\S/.test(name) &&
        name.length >= 2 &&
        name.length <= 30)
    ) setMessage('Le nom doit avoir entre 2 et 30 caractères');
    else {
      if (
        listeCategoriesIngredients.findIndex(categorie => categorie.nom === name.toUpperCase()) !== -1
      ) setMessage('Cette catégorie existe déja');
      else {
        setMessage('');
        Axios.post(`${apiBaseURL}/api/v2/categories`,
          { nom: name },
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
  }

  return (
    <form className='form-ingredient-category-add' onSubmit={addCategory}>
      <div id='ingredient-category-add-name'>
        <TextField
          variant='outlined'
          margin='normal'
          label='Nouvelle catégorie'
          name='ingredientCategoryName'
          value={ingredientCategoryName}
          onChange={event => setIngredientCategoryName(event.target.value)}
          required
        />
      </div>
      <div id='ingredient-category-add-btn'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          +
        </Button>
      </div>
    </form>
  )

}
export default IngredientCategoryAdd;