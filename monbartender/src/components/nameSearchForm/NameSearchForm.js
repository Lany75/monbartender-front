import React, { useState } from 'react';
import Axios from "axios";
import { Button, TextField } from '@material-ui/core';

import './NameSearchForm.css';

import apiBaseURL from "../../env";

const NameSearchForm = ({ setCocktailName, setSearchCocktails }) => {
  const [nameCocktail, setNameCocktail] = useState('');

  const onSearch = (event) => {
    event.preventDefault();

    nameCocktail !== '' ? (
      Axios.get(`${apiBaseURL}/api/v2/cocktails/${nameCocktail.toLowerCase()}`)
        .then(reponse => {
          setSearchCocktails(reponse.data);
          setCocktailName(nameCocktail);
          setNameCocktail('');
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        })
    ) : (setSearchCocktails(null))

  }

  return (
    <form className='search-form' onSubmit={onSearch}>
      <TextField
        label="Nom du cocktail"
        onChange={event => setNameCocktail(event.target.value)}
        value={nameCocktail}
        autoFocus
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
      >
        Chercher
      </Button>
    </form>
  )
}

export default NameSearchForm;