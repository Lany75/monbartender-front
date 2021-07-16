import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";

import apiBaseURL from "../../env";

import RecipePage from '../recipePage/RecipePage';

const CocktailRecipe = () => {
  const { id } = useParams();
  const [CocktailRecipe, setCocktailRecipe] = useState();

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
  }, [id]);

  console.log(CocktailRecipe);

  return (
    <RecipePage cocktail={CocktailRecipe} />
  )
}

export default CocktailRecipe;