import React, { useState } from 'react';
import Axios from "axios";

import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';

import './IngredientAdd.css';

const IngredientAdd = () => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeCategoriesIngredients, setListeIngredients } = React.useContext(IngredientContext);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCategorie, setIngredientCategorie] = useState('');

  const handleChangeCategorie = (event) => {
    setIngredientCategorie(event.target.value);
  };

  const addIngredient = event => {
    event.preventDefault();

    if (ingredientName !== '' && ingredientCategorie !== '') {
      Axios.post(`${apiBaseURL}/api/v2/ingredients/`,
        { nom: ingredientName, categorie: ingredientCategorie },
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setListeIngredients(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  return (
    <div className='ingredient-add'>
      <h4>AJOUT D'UN INGREDIENT</h4>
      <form className='form-ingredient-add' onSubmit={addIngredient}>
        <div id='ingredient-add-name'>
          <TextField
            variant='outlined'
            margin='normal'
            label='Nom'
            name='ingredientName'
            value={ingredientName}
            onChange={event => setIngredientName(event.target.value)}
          />
        </div>
        <div id='ingredient-add-categories' className='form-control'>
          <FormControl variant='outlined' >
            <InputLabel id='label-categorie'>Catégorie</InputLabel>
            <Select
              className='form-control-select'
              labelId='select-categorie'
              id='select-categorie'
              value={ingredientCategorie}
              onChange={handleChangeCategorie}
              label='Catégorie'
            >
              {listeCategoriesIngredients && listeCategoriesIngredients.map(lci => {
                return (
                  <MenuItem value={lci.nom} key={lci.id}>{lci.nom}</MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
        <div id='ingredient-add-btn'>
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

export default IngredientAdd;