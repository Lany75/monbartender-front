import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";
import SelectComponentAllIngredients from "../selectComponentAllIngredients/SelectComponentAllIngredients";
import SelectComponentIngredientsBar from "../selectComponentIngredientsBar/SelectComponentIngredientsBar";
import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";

import "./RechercheParIngredient.css";
import "./RechercheParIngredientDesktop.css";

const RechercheParIngredient = () => {
  const { user } = useContext(AuthContext);
  const [cocktailsRecherche, setCocktailsRecherche] = useState();
  const [valueRadioButton, setValueRadioButton] = React.useState("indifferent");

  const Recherche = event => {
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
      Axios.get(`${apiBaseURL}/api/v1/cocktails?alcool=${valueRadioButton}`)
        .then(reponse => {
          setCocktailsRecherche(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    } else {
      Axios.get(
        `${apiBaseURL}/api/v1/cocktails/rechercher-par-ingredient?ingredient1=${nomIngredientdivSelect1}&ingredient2=${nomIngredientdivSelect2}&ingredient3=${nomIngredientdivSelect3}&alcool=${valueRadioButton}`
      )
        .then(reponse => {
          setCocktailsRecherche(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  };

  const handleChangeRadioButton = event => {
    setValueRadioButton(event.target.value);
  };

  return (
    <div id="page-recherche">
      <div id="titre-recherche-ingredient">Recherche par ingredients</div>
      <div id="recherche">
        <div id="groupe-boutons-radio">
          <RadioGroup
            id="bouton-radio"
            name="alcool"
            value={valueRadioButton}
            onChange={handleChangeRadioButton}
            row
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Avec alcool"
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="Sans alcool"
            />
            <FormControlLabel
              value="indifferent"
              control={<Radio />}
              label="Indifférent"
            />
          </RadioGroup>
        </div>
        <div id="choix-ingredients">
          <div id="titre-ingredient-cocktail">Ingredients du cocktail</div>
          {user ? (
            <div id="selection-ingredient">
              <SelectComponentIngredientsBar
                id="divSelect1"
                label="ingrédient 1"
              />
              <SelectComponentIngredientsBar
                id="divSelect2"
                label="ingrédient 2"
              />
              <SelectComponentIngredientsBar
                id="divSelect3"
                label="ingrédient 3"
              />
            </div>
          ) : (
            <div id="selection-ingredient">
              <SelectComponentAllIngredients
                id="divSelect1"
                label="ingrédient 1"
              />
              <SelectComponentAllIngredients
                id="divSelect2"
                label="ingrédient 2"
              />
              <SelectComponentAllIngredients
                id="divSelect3"
                label="ingrédient 3"
              />
            </div>
          )}
        </div>
        <div id="div-btn-recherche">
          <button id="btn-recherche-par-ingredient" onClick={Recherche}>
            Lancer la recherche ...
          </button>
        </div>
      </div>

      {cocktailsRecherche && (
        <div id="resultat-recherche">
          <div id="titre-resultat-recherche">Résultat de votre recherche</div>
          <div id="liste-cocktails">
            {cocktailsRecherche.length > 0 ? (
              cocktailsRecherche.map((cr, index) => {
                const to = "/cocktail/" + cr.id;
                return (
                  <Link to={to} key={index}>
                    <ComposantListeRecettes nom={cr.nom} photo={cr.photo} />
                  </Link>
                );
              })
            ) : (
              <div>Aucun cocktail trouvé pour cette recherche</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RechercheParIngredient;
