import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { IngredientContext } from "../../context/ingredientContext";

import "./GestionIngredients.css";
import "./GestionIngredientsDesktop.css";
import Axios from "axios";

import apiBaseURL from "../../env";
import { AuthContext } from "../../context/authContext";
import { CocktailContext } from "../../context/cocktailContext";
import { BarContext } from "../../context/barContext";

const GestionIngredients = () => {
  const { listeIngredients, setListeIngredients } = useContext(
    IngredientContext
  );
  const { listeCocktails } = useContext(CocktailContext);
  const { accessToken } = useContext(AuthContext);
  const { getBarUser } = useContext(BarContext);

  let history = useHistory();

  const ajouterIngredient = () => {
    history.push("/gestion/ajouter-ingredient");
  };

  const supprimerIngredient = ingredientId => {
    let ingredientUtil = false;

    // Vérification si l'ingrédient est utilisé dans un cocktail
    for (let i = 0; i < listeCocktails.length; i++) {
      for (let j = 0; j < listeCocktails[i].ingredient.length; j++) {
        if (listeCocktails[i].ingredient[j].id === ingredientId)
          ingredientUtil = true;
      }
    }

    if (ingredientUtil === false) {
      Axios.delete(`${apiBaseURL}/api/v1/ingredients/${ingredientId}`, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          setListeIngredients(reponse.data);
          //MAJ du bar de l'utilisateur
          getBarUser();
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    } else {
      alert(
        "SUPPRESSION IMPOSSIBLE : l'ingredient est utilisé pour un cocktail"
      );
    }
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
