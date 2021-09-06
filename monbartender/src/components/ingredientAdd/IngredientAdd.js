import React, { useState } from 'react';
import Axios from "axios";
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';
import './IngredientAdd.css';

import camelCaseText from '../../utils/cameCaseText';


const IngredientAdd = ({ setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeIngredients, listeCategoriesIngredients, setListeIngredients } = React.useContext(IngredientContext);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCategorie, setIngredientCategorie] = useState('');

  const handleChangeCategorie = (event) => {
    setIngredientCategorie(event.target.value);
  };

  const addIngredient = event => {
    event.preventDefault();
    const name = ingredientName.replace(/\s+/g, ' ').trim();

    if (
      !(/\S/.test(name) &&
        name.length >= 2 &&
        name.length <= 30)
    ) setMessage('Le nom doit avoir entre 2 et 30 caractères');
    else {
      if (
        listeIngredients.findIndex(ingr => ingr.nom === camelCaseText(name)) !== -1
      ) setMessage('Cet ingrédient existe déja');
      else {
        setMessage('');
        Axios.post(`${apiBaseURL}/api/v2/ingredients/`,
          { nom: name, categorie: ingredientCategorie },
          {
            headers: {
              authorization: accessToken
            }
          })
          .then(reponse => {
            setListeIngredients(reponse.data);
            setIngredientName('');
            setIngredientCategorie('');
          })
          .catch(error => {
            console.log("vous avez une erreur : ", error);
          });
      }
    }
  }

  return (
    <form className='form-ingredient-add' onSubmit={addIngredient}>
      <div id='ingredient-add-name'>
        <TextField
          variant='outlined'
          margin='normal'
          label='Nom'
          name='ingredientName'
          value={ingredientName}
          onChange={event => setIngredientName(event.target.value)}
          style={{ width: 220 }}
          required
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
            style={{ width: 220 }}
            required
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
          +
        </Button>
      </div>
    </form>
  )
}

export default IngredientAdd;