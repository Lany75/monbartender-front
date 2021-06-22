import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

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
  }, [listeCocktails]); // eslint-disable-line react-hooks/exhaustive-deps

  if (cocktailAleatoire) {
    to = "/cocktail/" + cocktailAleatoire.id;
  }

  return cocktailAleatoire ? (
    <div id="div-cocktail-btn" className="random-cocktail">
      {cocktailAleatoire && (
        <Link to={to}>
          <ComposantListeRecettes
            nom={cocktailAleatoire.nom}
            photo={cocktailAleatoire.photo}
          />
        </Link>
      )}
      <div id="div-btn-autre-cocktail">
        <Button
          id="btn-autre-cocktail"
          variant="contained"
          onClick={getCocktailAleatoire}
        >
          Un autre !!
        </Button>
      </div>
    </div>
  ) : (
    <div className='chargement-message'>Chargement ...</div>
  );
};

export default CocktailAleatoire;
