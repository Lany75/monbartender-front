import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CocktailAleatoire.css";
import "./CocktailAleatoireDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const initialState = {
  id: "",
  nom: "",
  photo: ""
};

const CocktailAleatoire = () => {
  const [cocktailAleatoire, setCocktailAleatoire] = useState(initialState);

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

  React.useEffect(() => {
    getCocktailAleatoire();
  }, []);

  const to = "/" + cocktailAleatoire.id;

  return (
    <>
      <div id="titre-cocktail-aleatoire">Cocktail aléatoire</div>
      <div id="div-cocktail-btn">
        {cocktailAleatoire && (
          <div className="cocktail-aleatoire">
            <Link to={to}>
              <img
                className="img-cocktail-aleatoire"
                src={`${apiBaseURL}${cocktailAleatoire.photo}`}
                alt={cocktailAleatoire.nom}
              />
              <div className="nom-cocktail-aleatoire">
                {cocktailAleatoire.nom}
              </div>
            </Link>
          </div>
        )}
        <div id="div-btn-autre-cocktail">
          <button id="btn-autre-cocktail" onClick={getCocktailAleatoire}>
            Un autre !!
          </button>
        </div>
      </div>
    </>
  );
};

export default CocktailAleatoire;
