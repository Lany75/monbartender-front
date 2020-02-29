import React, { useState } from "react";

import "./Accueil.css";
import { Link } from "react-router-dom";

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
  const to = "/" + cocktail.id;
  console.log(to);

  return (
    <>
      <h2>Cocktails du moment</h2>
      <Link to={to}>
        <div className="cocktail">
          <img
            className="imageRecetteAleatoire"
            src={`${apiBaseURL}${cocktail.photo}`}
            alt={cocktail.nom}
          />
          <div className="nomcocktail">{cocktail.nom}</div>
        </div>
      </Link>
    </>
  );
};

export default Accueil;
