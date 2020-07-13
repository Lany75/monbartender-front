import React, { useContext } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import { IngredientContext } from "../../context/ingredientContext";

import "./AjoutIngredientBar.css";
import "./AjoutIngredientBarDesktop.css";

const AjoutIngredientBar = () => {
  const { accessToken } = useContext(AuthContext);
  const { setBar } = useContext(BarContext);
  const { listeIngredients } = useContext(IngredientContext);

  const ajouterIngredient = event => {
    event.preventDefault();
    const nouvelIngredient = document
      .getElementById("input-ajout-ingredient")
      .value.toLowerCase();

    Axios.post(
      `${apiBaseURL}/api/v1/ingredients/${nouvelIngredient}`,
      {},
      {
        headers: {
          authorization: accessToken
        }
      }
    )
      .then(reponse => {
        setBar(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  return (
    <>
      <form id="formulaire-ajout-ingredient">
        {listeIngredients && (
          <Autocomplete
            id="input-ajout-ingredient"
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
        )}
        <button id="btn-ajout-ingredient" onClick={ajouterIngredient}>
          Ajouter l&apos;ingredient
        </button>
      </form>
    </>
  );
};

export default AjoutIngredientBar;
