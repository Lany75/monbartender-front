import React from 'react';
import Axios from "axios";
import { Autocomplete } from "@material-ui/lab";
import { Button, TextField } from "@material-ui/core";

import apiBaseURL from "../../env";

import LoadingMessage from '../loadingMessage/LoadingMessage';
import { IngredientContext } from "../../context/ingredientContext";
import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';

import './UserBarIngredientAdd.css';

const UserBarIngredientAdd = () => {
  const { listeIngredients } = React.useContext(IngredientContext);
  const { accessToken } = React.useContext(AuthContext);
  const { bar, setBar } = React.useContext(BarContext);
  const [addedIngredient, setAddedIngredient] = React.useState('');
  const [key, setKey] = React.useState(true);

  const addIngredient = event => {
    event.preventDefault();

    let alreadyExist = false;
    bar.Ingredients.forEach(el => {
      if (el.id === addedIngredient.id) alreadyExist = true;
    })

    if (addedIngredient !== '' && !alreadyExist) {
      Axios.post(`${apiBaseURL}/api/v2/bars/${addedIngredient.id}`,
        {},
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setBar(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
    setAddedIngredient('');
    setKey(!key);
  }

  return (
    <>
      {listeIngredients ? (
        <form className='bar-ingredient-add' onSubmit={addIngredient}>
          <Autocomplete
            key={key}
            className='ingredient-add-input'
            options={listeIngredients}
            getOptionLabel={option => option.nom}
            style={{ width: 200 }}
            onChange={(event, value) => setAddedIngredient(value)}
            renderInput={params => (
              <TextField
                {...params}
                label="Nouvel ingrédient"
                variant="outlined"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            +
          </Button>
        </form>
      ) : (
        <LoadingMessage message='Chargement ...' />
      )}
    </>
  )
}

export default UserBarIngredientAdd;