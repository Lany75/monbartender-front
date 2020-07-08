import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { IngredientContext } from "../../context/ingredientContext";

import "./GestionIngredients.css";
import "./GestionIngredientsDesktop.css";

const GestionIngredients = () => {
  const { listeIngredients } = useContext(IngredientContext);
  let history = useHistory();

  const ajouterIngredient = () => {
    history.push("/gestion/ajouter-ingredient");
  };

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
