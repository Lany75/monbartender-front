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

const UserBarIngredientAdd = ({ setMessage }) => {
  const { listeIngredients } = React.useContext(IngredientContext);
  const { accessToken } = React.useContext(AuthContext);
  const { bar, setBar } = React.useContext(BarContext);
  const [addedIngredient, setAddedIngredient] = React.useState({ id: '', nom: '' });
  const [key, setKey] = React.useState(true);

  const addIngredient = event => {
    event.preventDefault();

    if (
      !(addedIngredient &&
        /\S/.test(addedIngredient.nom))
    ) setMessage("Aucun ingrédient à ajouter");
    else {
      if (
        bar.Ingredients.findIndex(ingredient => ingredient.nom === addedIngredient.nom) !== -1
      ) setMessage('Cet ingrédient est déjà dans votre bar');
      else {
        Axios.post(`${apiBaseURL}/api/v2/barsIgredients`,
          { ingredientId: addedIngredient.id },
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
            onChange={(event, value) => {
              setAddedIngredient(value)
              setMessage('');
            }}
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