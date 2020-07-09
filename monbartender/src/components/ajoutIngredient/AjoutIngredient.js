import React, { useState, useContext } from "react";

import Axios from "axios";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";

import "./AjoutIngredient.css";

const AjoutIngredient = () => {
  let history = useHistory();
  const { accessToken } = useContext(AuthContext);

  const [nbIng, setNbIng] = useState(1);
  const lesIngredients = [];
  const tableauIngredientsAjoute = [];

  for (let i = 1; i <= nbIng; i++) {
    const id = "nom-ingredient-" + i;
    const label = "Nom ingrédient " + i;
    lesIngredients.push(<TextField id={id} key={i} label={label} />);
  }
  const ajoutIngredientBD = () => {
    for (let i = 1; i <= nbIng; i++) {
      const ingredientAjoute = document.getElementById("nom-ingredient-" + i);
      if (ingredientAjoute.value !== "")
        tableauIngredientsAjoute.push(ingredientAjoute.value);
    }

    //suppression des doublons;
    const tableauIngredientsUnique = new Set(tableauIngredientsAjoute);
    const sortedIngredients = [...tableauIngredientsUnique];

    if (sortedIngredients.length > 0) {
      Axios.post(`${apiBaseURL}/api/v1/gestion/ingredient`, sortedIngredients, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          console.log(reponse.data);
          history.push("/gestion");
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  };

  const AjoutDivIngredient = () => {
    if (nbIng < 10) setNbIng(nbIng + 1);
  };
  const SupprimeDivIngredient = () => {
    if (nbIng > 1) setNbIng(nbIng - 1);
  };

  return (
    <>
      <div id="titre-ingredient-ajoute">Ajout d&apos;ingrédients</div>
      <div id="ingr-bouton">
        <button id="btn-ajout-supp" onClick={AjoutDivIngredient}>
          +
        </button>
        <button id="btn-ajout-supp" onClick={SupprimeDivIngredient}>
          -
        </button>
      </div>
      <div id="box-ingredient">{lesIngredients}</div>

      <button id="btn-ajout-nv-ingredient" onClick={ajoutIngredientBD}>
        Ajouter !!
      </button>
    </>
  );
};

export default AjoutIngredient;