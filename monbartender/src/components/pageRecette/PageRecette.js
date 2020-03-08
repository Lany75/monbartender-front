import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./PageRecette.css";

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
    <>
      <h2>{recetteCocktail.nom}</h2>
      <img
        className="imagePageRecette"
        src={`${apiBaseURL}${recetteCocktail.photo}`}
        alt={recetteCocktail.nom}
      />
      <div className="ingredientsVerre">
        <div className="ingredients">
          <h3>Ingredients</h3>
          {recetteCocktail.Ingredients &&
            recetteCocktail.Ingredients.map((rc, index) => {
              return <div key={index}>{rc.nom}</div>;
            })}
        </div>
        <div className="verre">
          <h3>Verre</h3>
          <p>{recetteCocktail.Verre.nom}</p>
        </div>
      </div>
      <div className="preparation">
        <h2>Preparation</h2>
        <p>{recetteCocktail.etapesPreparation}</p>
      </div>
    </>
  );
};

export default PageRecette;
