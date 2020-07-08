import React, { useState } from "react";

import "./GestionIngredients.css";
import "./GestionIngredientsDesktop.css";
import Axios from "axios";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const GestionIngredients = () => {
  const [listeIngredients, setListeIngredient] = useState();
  let history = useHistory();

  const getListeIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/`)
      .then(reponse => {
        setListeIngredient(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const ajouterIngredient = () => {
    history.push("/gestion/ajouter-ingredient");
  };

  React.useEffect(() => {
    getListeIngredients();
  }, []);

  return (
    <>
      <div id="gestion-ingredients">
        <div id="titre-btn-ingredients">
          <div id="titre-ajout-ingredient">Liste ingrédients</div>
          <button id="btn-ajouter-ingredient" onClick={ajouterIngredient}>
            Ajouter
          </button>
        </div>
        {listeIngredients &&
          listeIngredients.map((c, index) => {
            return (
              <div id="nom-ingredient" key={index}>
                {c.nom}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GestionIngredients;
