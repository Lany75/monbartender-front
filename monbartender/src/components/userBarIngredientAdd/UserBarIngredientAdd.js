import React from 'react';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, TextField } from "@material-ui/core";

import LoadingMessage from '../loadingMessage/LoadingMessage';
import { IngredientContext } from "../../context/ingredientContext";
import './UserBarIngredientAdd.css';

const UserBarIngredientAdd = () => {
  const { listeIngredients } = React.useContext(IngredientContext);

  return (
    <>
      {listeIngredients ? (
        <form className='bar-ingredient-add'>
          <Autocomplete
            className='ingredient-add-input'
            options={listeIngredients}
            getOptionLabel={option => option.nom}
            style={{ width: 200 }}
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