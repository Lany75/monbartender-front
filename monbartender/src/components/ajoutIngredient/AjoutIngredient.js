import React, { useState, useContext } from "react";

import Axios from "axios";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";

import "./AjoutIngredient.css";
import "./AjoutIngredientDesktop.css";

import { IngredientContext } from "../../context/ingredientContext";
import { BarContext } from "../../context/barContext";

const AjoutIngredient = () => {
  let history = useHistory();
  const { accessToken, user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  const { setListeIngredients } = useContext(IngredientContext);

  const [nbIng, setNbIng] = useState(1);
  const lesIngredients = [];
  let tableauIngredientsAjoute = [];

  for (let i = 1; i <= nbIng; i++) {
    const id = "nom-ingredient-" + i;
    const label = "Nom ingrédient " + i;
    lesIngredients.push(<TextField id={id} key={i} label={label} />);
  }
  const ajoutIngredientBD = () => {
    for (let i = 1; i <= nbIng; i++) {
      const ingredientAjoute = document.getElementById("nom-ingredient-" + i);
      if (ingredientAjoute.value !== "")
        tableauIngredientsAjoute.push({
          nom: ingredientAjoute.value.replace(
            /(^\w|\s\w)(\S*)/g,
            (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
          )
        });
    }

    // On supprime les doublons dans tableauIngredientsAjoute
    tableauIngredientsAjoute.sort((a, b) => {
      return a.nom.localeCompare(b.nom);
    });

    for (let i = 1; i < tableauIngredientsAjoute.length; i++) {
      if (
        tableauIngredientsAjoute[i - 1].nom === tableauIngredientsAjoute[i].nom
      ) {
        tableauIngredientsAjoute.splice(i, 1);
        i--;
      }
    }

    if (tableauIngredientsAjoute.length > 0) {
      tableauIngredientsAjoute.map(ia => {
        Axios.post(
          `${apiBaseURL}/api/v1/ingredients?nom=${ia.nom}`,
          {},
          {
            headers: {
              authorization: accessToken
            }
          }
        )
          .then(reponse => {
            setListeIngredients(reponse.data);
          })
          .catch(error => {
            console.log("vous avez une erreur : ", error);
          });
      });
    }
    history.push("/gestion");
  };

  const AjoutDivIngredient = () => {
    if (nbIng < 10) setNbIng(nbIng + 1);
  };
  const SupprimeDivIngredient = () => {
    if (nbIng > 1) setNbIng(nbIng - 1);
  };

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-ingredient-ajoute">Ajout d&apos;ingrédients</div>
          <div id="ingr-bouton">
            <Button
              id="btn-ajout-supp"
              variant="contained"
              onClick={AjoutDivIngredient}
            >
              +
            </Button>
            <Button
              id="btn-ajout-supp"
              variant="contained"
              onClick={SupprimeDivIngredient}
            >
              -
            </Button>
          </div>
          <div id="box-ingredient">{lesIngredients}</div>

          <Button
            id="btn-ajout-nv-ingredient"
            variant="contained"
            onClick={ajoutIngredientBD}
          >
            Ajouter !!
          </Button>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default AjoutIngredient;
