import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";

import "./CocktailAleatoire.css";
import "./CocktailAleatoireDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const CocktailAleatoire = () => {
  const [cocktailAleatoire, setCocktailAleatoire] = useState();
  let to;

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

  if (cocktailAleatoire) {
    to = "/cocktail/" + cocktailAleatoire.id;
  }

  return cocktailAleatoire ? (
    <>
      <div id="titre-cocktail-aleatoire">Cocktail aléatoire</div>
      <div id="div-cocktail-btn">
        {cocktailAleatoire && (
          <Link to={to}>
            <ComposantListeRecettes
              nom={cocktailAleatoire.nom}
              photo={cocktailAleatoire.photo}
            />
          </Link>
        )}
        <div id="div-btn-autre-cocktail">
          <button id="btn-autre-cocktail" onClick={getCocktailAleatoire}>
            Un autre !!
          </button>
        </div>
      </div>
    </>
  ) : (
    <div>Chargement</div>
  );
};

export default CocktailAleatoire;
