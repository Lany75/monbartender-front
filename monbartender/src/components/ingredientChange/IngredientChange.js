import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { TextField, InputLabel, MenuItem, FormControl, Select, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';

import './IngredientChange.css';


const IngredientChange = ({ ingredient }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeCategoriesIngredients, setListeIngredients } = React.useContext(IngredientContext);
  const { getBarUser } = React.useContext(BarContext);
  const [ingredientId, setIngredientId] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientCategorie, setIngredientCategorie] = useState('');

  const handleChangeCategorie = (event) => {
    setIngredientCategorie(event.target.value);
  };

  const modifyIngredient = event => {
    event.preventDefault();

    if (ingredientId !== '' && ingredientName !== '' && ingredientCategorie !== '') {
      Axios.put(`${apiBaseURL}/api/v2/ingredients/${ingredientId}`,
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

  const deleteIngredient = event => {
    event.preventDefault();

    if (ingredient) {
      Axios.delete(`${apiBaseURL}/api/v2/ingredients/${ingredientId}`,
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setListeIngredients(reponse.data);
          getBarUser();
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  useEffect(() => {
    if (ingredient) {
      setIngredientId(ingredient.id);
      setIngredientName(ingredient.nom);
      setIngredientCategorie(ingredient.CategorieIngredient.nom)
    }
  }, [ingredient])

  return (
    <div className='ingredient-change'>
      <h4>MODIFICATION D'UN INGREDIENT</h4>
      <form className='form-ingredient-change' onSubmit={modifyIngredient}>
        {ingredient ? (
          <p id='ingredient-id'>id: {ingredient?.id}</p>
        ) : (
          <p id='ingredient-id'>Cliquer dans le tableau sur l'ingrédient à modifier ou à supprimer</p>
        )}
        <div id='ingredient-name'>
          <TextField
            variant='outlined'
            margin='normal'
            label='Nom'
            name='ingredientName'
            value={ingredientName}
            onChange={event => setIngredientName(event.target.value)}
          />
        </div>
        <div id='ingredient-categories' className='form-control'>
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
        <div id='ingredient-change-btn-modify'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Modifier
          </Button>
        </div>
        <div id='ingredient-change-btn-delete'>
          <Button
            type='button'
            variant='contained'
            color='primary'
            onClick={deleteIngredient}
          >
            Supprimer
          </Button>
        </div>
      </form>
    </div>
  )
}

export default IngredientChange;