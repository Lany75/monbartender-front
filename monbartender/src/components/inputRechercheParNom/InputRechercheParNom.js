import React, { useState } from "react";

import "./InputRechercheParNom.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const InputRechercheParNom = () => {
  const [cocktails, setCocktails] = useState([]);

  function RecupererCocktailParNom(e) {
    if (e.key === "Enter") {
      const cocktailName = document.getElementById("nomCocktail").value;

      fetch(`${apiBaseURL}/api/cocktails/rechercher?nom=${cocktailName}`)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          console.log("data", data);
          setCocktails(data);
          return cocktails;
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  return (
    <div className="inputNom">
      <input
        type="text"
        id="nomCocktail"
        name="nomCocktail"
        placeholder="nom du cocktail"
        //onKeyUp={() => getCocktailsByName()}
        onKeyPress={RecupererCocktailParNom}
      />
    </div>
  );
};

export default InputRechercheParNom;
