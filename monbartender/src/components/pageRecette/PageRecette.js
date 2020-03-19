import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./PageRecette.css";
import "./PageRecetteDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const initialState = {
  nom: "",
  photo: "",
  etapesPreparation: "",
  Verre: {
    nom: ""
  },
  Ingredients: [
    {
      nom: ""
    }
  ]
};

const PageRecette = () => {
  const [recetteCocktail, setRecetteCocktail] = useState(initialState);
  const { id } = useParams();

  const getRecetteCocktail = cocktailId => {
    fetch(`${apiBaseURL}/api/cocktails/${cocktailId}`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setRecetteCocktail(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getRecetteCocktail(id);
  }, [id]);

  return (
    <div id="recette-cocktail">
      <h2>{recetteCocktail.nom}</h2>
      <img
        className="img-cocktail-recette"
        src={`${apiBaseURL}${recetteCocktail.photo}`}
        alt={recetteCocktail.nom}
      />
      <div id="ingredients-verre">
        <div id="liste-ingredients">
          <h3>Ingredients</h3>
          {recetteCocktail.Ingredients &&
            recetteCocktail.Ingredients.map((rc, index) => {
              return (
                <div className="ingredient" key={index}>
                  {rc.nom}
                </div>
              );
            })}
        </div>
        <div id="verre">
          <h3>Verre</h3>
          <div id="nom-verre">{recetteCocktail.Verre.nom}</div>
        </div>
      </div>
      <div className="etapes-preparation">
        <h3>Preparation</h3>
        <p>{recetteCocktail.etapesPreparation}</p>
      </div>
    </div>
  );
};

export default PageRecette;
