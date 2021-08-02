import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';

import './IngredientCategoryChange.css';

const IngredientCategoryChange = ({ category, setCategory }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { setListeCategoriesIngredients, getListeIngredients } = React.useContext(IngredientContext);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const modifyCategory = event => {
    event.preventDefault();

    if (categoryId !== '' && categoryName !== '') {
      Axios.put(`${apiBaseURL}/api/v2/categories/${categoryId}`,
        { nom: categoryName },
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setListeCategoriesIngredients(reponse.data);
          getListeIngredients();
          setCategory(null);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  useEffect(() => {
    if (category) {
      setCategoryId(category.id);
      setCategoryName(category.nom);
    } else {
      setCategoryId('');
      setCategoryName('');
    }
  }, [category])

  return (
    <div className='ingredient-category-change'>
      <h4>MODIFICATION D'UNE CATEGORIE D'INGREDIENT</h4>
      <form className='form-category-change' onSubmit={modifyCategory}>
        {category ? (
          <p id='category-id'>id: {category?.id}</p>
        ) : (
          <p id='category-id'>Cliquer dans le tableau sur la catégorie à modifier</p>
        )}
        <div id='category-name'>
          <TextField
            variant='outlined'
            margin='normal'
            label='Nom'
            name='categoryName'
            value={categoryName}
            onChange={event => setCategoryName(event.target.value)}
          />
        </div>
        <div id='category-change-btn-modify'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Modifier
          </Button>
        </div>
      </form>
    </div>
  )
}

export default IngredientCategoryChange;