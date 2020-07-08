import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import Axios from "axios";

import "./RechercheParIngredient.css";
import "./RechercheParIngredientDesktop.css";

import SelectComponentAllIngredients from "../selectComponentAllIngredients/SelectComponentAllIngredients";
import SelectComponentIngredientsBar from "../selectComponentIngredientsBar/SelectComponentIngredientsBar";
import { Link } from "react-router-dom";
import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

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
      Axios.get(`${apiBaseURL}/api/v1/cocktails`)
        .then(reponse => {
          setCocktailsRecherche(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    } else {
      let alcool;
      switch (valueRadioButton) {
        case "Aalcool":
          alcool = true;
          break;
        case "Salcool":
          alcool = false;
          break;
        default:
          alcool = "indifferent";
      }

      Axios.get(
        `${apiBaseURL}/api/v1/cocktails/rechercher-par-ingredient?ingredient1=${nomIngredientdivSelect1}&ingredient2=${nomIngredientdivSelect2}&ingredient3=${nomIngredientdivSelect3}&alcool=${alcool}`
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
              value="Aalcool"
              control={<Radio />}
              label="Avec alcool"
            />
            <FormControlLabel
              value="Salcool"
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
