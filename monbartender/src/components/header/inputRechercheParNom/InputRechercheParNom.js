import React from "react";

import "./InputRechercheParNom.css";
import "./InputRechercheParNomDesktop.css";

import { useHistory } from "react-router-dom";

const InputRechercheParNom = () => {
  let history = useHistory();

  function RecupererCocktailParNom(e) {
    if (e.key === "Enter") {
      history.push("/rechercherparnom");
    }
  }

  return (
    <input
      type="text"
      id="nom-cocktail-recherche"
      name="nom-cocktail-recherche"
      placeholder="nom du cocktail"
      onKeyPress={RecupererCocktailParNom}
    />
  );
};

export default InputRechercheParNom;
