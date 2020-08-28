import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";
import { CocktailContext } from "../../context/cocktailContext";

import "./CocktailAleatoire.css";
import "./CocktailAleatoireDesktop.css";

const CocktailAleatoire = () => {
  const [cocktailAleatoire, setCocktailAleatoire] = useState();
  const { listeCocktails } = useContext(CocktailContext);
  let to;

  function getRandomInteger(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const getCocktailAleatoire = () => {
    if (listeCocktails) {
      let randomInt = getRandomInteger(listeCocktails.length);
      if (listeCocktails[randomInt] !== cocktailAleatoire) {
        setCocktailAleatoire(listeCocktails[randomInt]);
      } else {
        getCocktailAleatoire();
      }
    }
  };

  React.useEffect(() => {
    getCocktailAleatoire();
  }, [listeCocktails]);

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
