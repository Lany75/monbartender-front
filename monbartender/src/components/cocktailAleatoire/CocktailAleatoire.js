import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";

import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";

import "./CocktailAleatoire.css";
import "./CocktailAleatoireDesktop.css";

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
