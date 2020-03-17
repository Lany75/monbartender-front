import React, { useState } from "react";

import "./RechercheParIngredientNonConnecte.css";
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
  /*  const [cocktailIdParIngredient, setCocktailIdParIngredient] = useState(
    initialState
  );*/
  const [cocktailsRecherche, setCocktailsRecherche] = useState();
  let history = new useHistory();

  const RechercheParIngredient = event => {
    event.preventDefault();
    console.log("on recherche le cocktail");
    /* const divSelect = document.getElementsByClassName("selection-box");
    console.log("divSelect[0] : ", divSelect[0].value);
    console.log("divSelect[1] : ", divSelect[1].value);
    console.log("divSelect[2] : ", divSelect[2].value); */
    let nomIngredientdivSelect1 = document.getElementById("divSelect1").value;
    if (nomIngredientdivSelect1 === "choisissez un ingredient")
      nomIngredientdivSelect1 = "";
    //console.log("nomIngredientdivSelect1 : ", nomIngredientdivSelect1);
    let nomIngredientdivSelect2 = document.getElementById("divSelect2").value;
    if (nomIngredientdivSelect2 === "choisissez un ingredient")
      nomIngredientdivSelect2 = "";
    //console.log("nomIngredientdivSelect1 : ", nomIngredientdivSelect2);
    let nomIngredientdivSelect3 = document.getElementById("divSelect3").value;
    if (nomIngredientdivSelect3 === "choisissez un ingredient")
      nomIngredientdivSelect3 = "";
    //console.log("nomIngredientdivSelect1 : ", nomIngredientdivSelect3);

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
      // history.push("/recettes");
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

  //console.log("cocktailIdParIngredient : ", cocktailsRecherche);

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
    <>
      <h2>Recherche par ingredients</h2>
      <div className="recherche">
        <div className="ingredients">
          <h3>Ingredients du cocktail</h3>
          <div id="selection-ingredient">
            <SelectComponentAllIngredients id="divSelect1" />
            <SelectComponentAllIngredients id="divSelect2" />
            <SelectComponentAllIngredients id="divSelect3" />
          </div>
        </div>
        <button
          className="bouton-recherche-par-ingredient"
          onClick={RechercheParIngredient}
        >
          Rechercher les recettes
        </button>
      </div>
      <button onClick={RecetteAuHasard}>Recette au hasard</button>

      {cocktailsRecherche && (
        <div className="resultat-recherche">
          <h3>Résultat de votre recherche</h3>
          <ListeCocktailsComponent cocktails={cocktailsRecherche} />
        </div>
      )}
    </>
  );
};

export default RechercheParIngredientNonConnecte;
