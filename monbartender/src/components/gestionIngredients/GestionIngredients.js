import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { IngredientContext } from "../../context/ingredientContext";

import "./GestionIngredients.css";
import "./GestionIngredientsDesktop.css";
import Axios from "axios";

import apiBaseURL from "../../env";
import { AuthContext } from "../../context/authContext";

const GestionIngredients = () => {
  const { listeIngredients, setListeIngredients } = useContext(
    IngredientContext
  );
  const { accessToken } = useContext(AuthContext);

  let history = useHistory();

  const ajouterIngredient = () => {
    history.push("/gestion/ajouter-ingredient");
  };

  const supprimerIngredient = ingredientId => {
    Axios.delete(`${apiBaseURL}/api/v1/ingredients/${ingredientId}`, {
      headers: {
        authorization: accessToken
      }
    })
      .then(reponse => {
        setListeIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
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
            listeIngredients.map((li, index) => {
              return (
                <div className="item-ingredient" key={index}>
                  <div id="nom-ingredient-gestion">{li.nom}</div>
                  <div>
                    <button
                      className="btn-gestion-supp-ingredient"
                      onClick={() => supprimerIngredient(li.id)}
                    >
                      supprimer
                    </button>
                    <button
                      className="btn-gestion-modif-ingredient"
                      // onClick={() => modifierIngredient(li.id)}
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
