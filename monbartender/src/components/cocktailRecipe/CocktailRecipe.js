import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";

import apiBaseURL from "../../env";

import RecipePage from '../recipePage/RecipePage';
import LoadingMessage from '../loadingMessage/LoadingMessage';

const CocktailRecipe = () => {
  const { id } = useParams();
  const [cocktailRecipe, setCocktailRecipe] = useState();

  const getCocktailRecipe = () => {
    Axios.get(`${apiBaseURL}/api/v2/cocktails/${id}`)
      .then(reponse => {
        setCocktailRecipe(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  useEffect(() => {
    getCocktailRecipe(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {cocktailRecipe ? (
        <RecipePage cocktail={cocktailRecipe} />
      ) : (
        <LoadingMessage message='Chargement ...' />
      )}
    </>
  )
}

export default CocktailRecipe;