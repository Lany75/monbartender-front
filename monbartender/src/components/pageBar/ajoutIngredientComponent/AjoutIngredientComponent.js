import React, { useContext, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { AuthContext } from "../../../context/authContext";
import { BarContext } from "../../../context/barContext";

import "./AjoutIngredientComponent.css";
import "./AjoutIngredientComponentDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const AjoutIngredientComponent = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { setBar } = useContext(BarContext);
  const [allIngredients, setAllIngredients] = useState();

  //  const inputNvlIng = document.getElementById("nvl-ingredient");

  // Recuperer la liste de tous les ingredients de la table ingredients
  const getAllIngredients = () => {
    user &&
      fetch(`${apiBaseURL}/api/v1/ingredients/`, {
        method: "GET"
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setAllIngredients(data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  const ajouterIngredient = event => {
    event.preventDefault();
    const nouvelIngredient = document
      .getElementById("input-ajout-ingredient")
      .value.toLowerCase();

    fetch(`${apiBaseURL}/api/v1/ingredients/${nouvelIngredient}`, {
      method: "POST",
      headers: {
        authorization: accessToken
      }
    })
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setBar(data);
      });
  };

  React.useEffect(() => {
    getAllIngredients();
  }, []);

  return (
    <>
      <form id="formulaire-ajout-ingredient">
        {allIngredients && (
          <Autocomplete
            id="input-ajout-ingredient"
            options={allIngredients}
            getOptionLabel={option => option.nom}
            style={{ width: 300 }}
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

export default AjoutIngredientComponent;
