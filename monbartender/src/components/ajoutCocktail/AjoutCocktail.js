import React, { useState, useContext } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import "./AjoutCocktail.css";
import "./AjoutCocktailDesktop.css";
import Axios from "axios";
import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";
import IngredientNvCockComponent from "../ingredientNvCockComponent/IngredientNvCockComponent";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const AjoutCocktail = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const [verres, setVerres] = useState();
  // const [ingredients, setIngredients] = useState();
  //let nbrIngredient = 0;

  const getAllVerres = () => {
    // on récupère tous les verres existants dans la base de données
    Axios.get(`${apiBaseURL}/api/v1/verres/`)
      .then(reponse => {
        setVerres(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  /*  const getAllIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/`)
      .then(reponse => {
        setIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }; */

  const AjoutDivIngredient = () => {
    /* const nomElement = "IngredientNvCockComponent";
    const divIngredients = document.getElementById("box-ingredient");
    const divNvIngr = document.createElement(nomElement);
    divNvIngr.setAttribute("labelIngredient", "Ingrédient 2");
    console.log(divNvIngr);
    divIngredients.append(divNvIngr); */

    //return <IngredientNvCockComponent labelIngredient="Ingrédient 2" />;
    /*    nbrIngredient += 1;
    const divIngredients = document.getElementById("box-ingredient");
    const nvIngredient = document.createElement("div");
    // console.log(nvIngredient);

    //nvIngredient.textContent = "essai " + nbrIngredient;
    divIngredients.append(nvIngredient); */

    const divIngredients = document.getElementsByClassName(
      "ingredient-quantite invisible"
    );

    if (divIngredients.length > 0) {
      divIngredients[0].classList.replace("invisible", "visible");
    }
  };

  const SupprimeDivIngredient = () => {
    const divIngredients = document.getElementsByClassName(
      "ingredient-quantite visible"
    );

    if (divIngredients.length > 1) {
      divIngredients[divIngredients.length - 1].classList.replace(
        "visible",
        "invisible"
      );
    }
  };

  const AjoutDivEtape = () => {
    const divEtapes = document.getElementsByClassName(
      "etape-nv-cocktail invisible"
    );

    if (divEtapes.length > 0) {
      divEtapes[0].classList.replace("invisible", "visible");
    }
  };

  const SupprimeDivEtape = () => {
    const divEtapes = document.getElementsByClassName(
      "etape-nv-cocktail visible"
    );

    if (divEtapes.length > 1) {
      divEtapes[divEtapes.length - 1].classList.replace("visible", "invisible");
    }
  };

  React.useEffect(() => {
    getAllVerres();
    //   getAllIngredients();
  }, []);

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-ajout-cocktail">Ajout de cocktail</div>
          <div id="nom-nv-cocktail">
            <TextField label="Nom du cocktail" />
          </div>
          <div id="div-photo">
            <div>Photo</div>
            <input
              type="file"
              id="photo-cocktail"
              name="photo-cocktail"
              accept="image/png, image/jpeg"
            />
          </div>

          {verres && (
            <div id="verre-nv-cocktail">
              <Autocomplete
                options={verres}
                getOptionLabel={option => option.nom}
                style={{ width: 300 }}
                renderInput={params => <TextField {...params} label="Verre" />}
              />
            </div>
          )}

          <div id="div-ingredients">
            <div id="ingr-bouton">
              <div>Ingrédients (10 maximum)</div>
              <button id="btn-ajout-supp" onClick={AjoutDivIngredient}>
                +
              </button>
              <button id="btn-ajout-supp" onClick={SupprimeDivIngredient}>
                -
              </button>
            </div>
            <div id="box-ingredient">
              <IngredientNvCockComponent
                classe="ingredient-quantite visible"
                labelIngredient="Ingrédient 1"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 2"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 3"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 4"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 5"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 6"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 7"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 8"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 9"
              />

              <IngredientNvCockComponent
                classe="ingredient-quantite invisible"
                labelIngredient="Ingrédient 10"
              />
            </div>
          </div>

          <div id="div-etapes-preparation">
            <div id="etapes-bouton">
              <div>Etapes Préparation (6 maximum)</div>
              <button id="btn-ajout-supp" onClick={AjoutDivEtape}>
                +
              </button>
              <button id="btn-ajout-supp" onClick={SupprimeDivEtape}>
                -
              </button>
            </div>
            <div id="box-etapes">
              <textarea
                className="etape-nv-cocktail visible"
                rows="4"
                placeholder="Etape 1"
              />
              <textarea
                className="etape-nv-cocktail invisible"
                rows="4"
                placeholder="Etape 2"
              />
              <textarea
                className="etape-nv-cocktail invisible"
                rows="4"
                placeholder="Etape 3"
              />
              <textarea
                className="etape-nv-cocktail invisible"
                rows="4"
                placeholder="Etape 4"
              />
              <textarea
                className="etape-nv-cocktail invisible"
                rows="4"
                placeholder="Etape 5"
              />
              <textarea
                className="etape-nv-cocktail invisible"
                rows="4"
                placeholder="Etape 6"
              />
            </div>
          </div>

          <button id="btn-ajout-nv-cocktail">Ajouter !!</button>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default AjoutCocktail;
