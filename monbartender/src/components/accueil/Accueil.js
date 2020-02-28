import React, { useState } from "react";

import "./Accueil.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const initialState = {
  nom: "",
  photo: ""
};

const Accueil = () => {
  const [cocktail, setCocktail] = useState(initialState);

  const getCocktailAleatoiredata = () => {
    fetch(`${apiBaseURL}/api/cocktails/aleatoire`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setCocktail(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getCocktailAleatoiredata();
  }, []);

  console.log("cocktail : ", cocktail);

  return (
    <>
      <h2>Cocktails du moment</h2>
      <img
        className="imageRecetteAleatoire"
        src={`${apiBaseURL}${cocktail.photo}`}
        alt={cocktail.nom}
      />
      <div className="nomcocktail">{cocktail.nom}</div>

    </>
  );
};

export default Accueil;
