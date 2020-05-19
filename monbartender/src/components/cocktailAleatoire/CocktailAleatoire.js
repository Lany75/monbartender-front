import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CocktailAleatoire.css";
import "./CocktailAleatoireDesktop.css";
import Axios from "axios";

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
    Axios.get(`${apiBaseURL}/api/v1/cocktails/aleatoire`)
      .then(reponse => {
        setCocktailAleatoire(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getCocktailAleatoire();
  }, []);

  const to = "/cocktail/" + cocktailAleatoire.id;

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
