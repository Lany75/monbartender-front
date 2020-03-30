import React, { useState } from "react";

import "./RechercheParIngredientNonConnecte.css";
import "./RechercheParIngredientNonConnecteDesktop.css";

import { useHistory } from "react-router-dom";
import SelectComponentAllIngredients from "../selectComponentAllIngredients/SelectComponentAllIngredients";
import ListeCocktailsComponent from "../../listeCocktailsComponent/ListeCocktailsComponent";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const initialState = {
  nom: "",
  photo: ""
};

const RechercheParIngredientNonConnecte = () => {
  const [cocktailAleatoire, setCocktailAleatoire] = useState(initialState);
  const [cocktailsRecherche, setCocktailsRecherche] = useState();
  let history = new useHistory();

  const RechercheParIngredient = event => {
    event.preventDefault();
    let nomIngredientdivSelect1 = document.getElementById("divSelect1").value;
    if (nomIngredientdivSelect1 === "choisissez un ingredient")
      nomIngredientdivSelect1 = "";

    let nomIngredientdivSelect2 = document.getElementById("divSelect2").value;
    if (nomIngredientdivSelect2 === "choisissez un ingredient")
      nomIngredientdivSelect2 = "";

    let nomIngredientdivSelect3 = document.getElementById("divSelect3").value;
    if (nomIngredientdivSelect3 === "choisissez un ingredient")
      nomIngredientdivSelect3 = "";

    if (
      nomIngredientdivSelect1 === "" &&
      nomIngredientdivSelect2 === "" &&
      nomIngredientdivSelect3 === ""
    ) {
      fetch(`${apiBaseURL}/api/cocktails`)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setCocktailsRecherche(data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    } else {
      fetch(
        `${apiBaseURL}/api/cocktails/rechercherparingredient?ingredient1=${nomIngredientdivSelect1}&ingredient2=${nomIngredientdivSelect2}&ingredient3=${nomIngredientdivSelect3}`
      )
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setCocktailsRecherche(data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  };

  const getCocktailAleatoire = () => {
    fetch(`${apiBaseURL}/api/cocktails/aleatoire`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setCocktailAleatoire(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const RecetteAuHasard = () => {
    history.push("/" + cocktailAleatoire.id);
  };

  React.useEffect(() => {
    getCocktailAleatoire();
  }, []);

  return (
    <div id="page-recherche">
      <div id="titre-recherche-ingredient">Recherche par ingredients</div>
      <div id="recherche">
        <div id="choix-ingredients">
          <div id="titre-ingredient-cocktail">Ingredients du cocktail</div>
          <div id="selection-ingredient">
            <SelectComponentAllIngredients id="divSelect1" />
            <SelectComponentAllIngredients id="divSelect2" />
            <SelectComponentAllIngredients id="divSelect3" />
          </div>
        </div>
        <div id="div-btn-recherche">
          <button
            id="btn-recherche-par-ingredient"
            onClick={RechercheParIngredient}
          >
            Rechercher les recettes
          </button>
        </div>
      </div>
      <button id="btn-hasard" onClick={RecetteAuHasard}>
        Recette au hasard
      </button>

      {cocktailsRecherche && (
        <div id="resultat-recherche">
          <div id="titre-resultat-recherche">Résultat de votre recherche</div>
          <ListeCocktailsComponent cocktails={cocktailsRecherche} />
        </div>
      )}
    </div>
  );
};

export default RechercheParIngredientNonConnecte;
