import React, { useContext } from "react";

import "./BarComponent.css";
import "./BarComponentDesktop.css";

import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import Axios from "axios";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const BarComponent = ingredient => {
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

export default BarComponent;
