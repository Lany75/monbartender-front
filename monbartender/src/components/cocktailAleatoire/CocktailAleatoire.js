import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./CocktailAleatoire.css";
import "./CocktailAleatoireDesktop.css";
import Axios from "axios";
import ImageCocktail from "../imageCocktail/ImageCocktail";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

/* const initialState = {
  id: "",
  nom: "",
  photo: ""
}; */

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
          <div className="cocktail-aleatoire">
            <Link to={to}>
              <ImageCocktail
                classe="img-cocktail"
                reference={cocktailAleatoire.photo}
                nom={cocktailAleatoire.nom}
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
  ) : (
    <div>Chargement</div>
  );
};

export default CocktailAleatoire;
