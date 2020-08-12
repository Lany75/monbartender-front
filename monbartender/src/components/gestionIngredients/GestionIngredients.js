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
        <div id="items-ingredients">
          {listeIngredients &&
            listeIngredients.map((c, index) => {
              return (
                <div className="item-ingredient" key={index}>
                  <div id="nom-ingredient-gestion">{c.nom}</div>
                  <div>
                    <button
                      className="btn-gestion-supp-ingredient"
                      //onClick={() => supprimerVerre(lv.id)}
                    >
                      supprimer
                    </button>
                    <button
                      className="btn-gestion-modif-ingredient"
                      // onClick={() => modifierVerre(lv.id)}
                    >
                      modifier
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default GestionIngredients;
