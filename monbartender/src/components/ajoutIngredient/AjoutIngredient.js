import React, { useState } from "react";

import "./AjoutIngredient.css";
import { TextField } from "@material-ui/core";

const AjoutIngredient = () => {
  const [nbIng, setNbIng] = useState(1);
  const lesIngredients = [];
  const tableauIngredientsAjoute = [];

  for (let i = 1; i <= nbIng; i++) {
    const id = "nom-ingredient-" + i;
    const label = "Nom ingrédient " + i;
    lesIngredients.push(<TextField id={id} key={i} label={label} />);
  }
  const ajoutIngredientBD = () => {
    for (let i = 1; i <= nbIng; i++) {
      const ingredientAjoute = document.getElementById("nom-ingredient-" + i);
      //console.log(ingredientAjoute.value);
      if (ingredientAjoute.value !== "")
        tableauIngredientsAjoute.push(ingredientAjoute.value);
    }

    //suppression des doublons;
    const tableauIngredientsUnique = new Set(tableauIngredientsAjoute);
    const sortedIngredients = [...tableauIngredientsUnique];

    if (sortedIngredients.length > 0) {
      sortedIngredients.map(i => {
        console.log(i);
        //faire ici l'appel au back
      });
    }
  };

  const AjoutDivIngredient = () => {
    if (nbIng < 10) setNbIng(nbIng + 1);
  };
  const SupprimeDivIngredient = () => {
    if (nbIng > 1) setNbIng(nbIng - 1);
  };

  /* const onSubmit = async data => {
    //event.preventDefault();
    console.log(data);
  }; */

  return (
    <>
      <div id="titre-ingredient-ajoute">Ajout d&apos;ingrédients</div>
      <div id="ingr-bouton">
        <button id="btn-ajout-supp" onClick={AjoutDivIngredient}>
          +
        </button>
        <button id="btn-ajout-supp" onClick={SupprimeDivIngredient}>
          -
        </button>
      </div>
      {/* <form
        id="formulaire-ajout-ingredient"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      > */}
      <div id="box-ingredient">{lesIngredients}</div>

      <button id="btn-ajout-nv-ingredient" onClick={ajoutIngredientBD}>
        Ajouter !!
      </button>
      {/*  </form> */}
    </>
  );
};

export default AjoutIngredient;
