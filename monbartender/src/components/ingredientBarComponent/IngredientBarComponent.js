import React, { useContext } from "react";
import Axios from "axios";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";

import "./IngredientBarComponent.css";
import "./IngredientBarComponentDesktop.css";

const IngredientBarComponent = ingredient => {
  const { user, accessToken } = useContext(AuthContext);
  const { setBar } = useContext(BarContext);

  const supprimerIngredient = nomBouton => {
    const ingredientSupprime = document.getElementById(nomBouton + "-div")
      .innerHTML;

    user &&
      accessToken &&
      Axios.delete(`${apiBaseURL}/api/v1/ingredients/${ingredientSupprime}`, {
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
  };

  return (
    <>
      <div className="nom-ingredient-bar" id={ingredient.nom + "-div"}>
        {ingredient.nom}
      </div>
      <button
        className="btn-suppression-ingredient"
        onClick={() => supprimerIngredient(ingredient.nom)}
      >
        X
      </button>
    </>
  );
};

export default IngredientBarComponent;
