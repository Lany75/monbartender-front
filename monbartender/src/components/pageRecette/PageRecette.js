import React, { useState } from "react";

import "./PageRecette.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const PageRecette = props => {
  const [recetteCocktail, setRecetteCocktail] = useState([]);

  const getRecetteCocktail = () => {
    fetch(`${apiBaseURL}/api/cocktails/${props.match.params.id}`)
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
    getRecetteCocktail();
  }, []);

  return (
    <>
      <h2>{recetteCocktail.nom}</h2>
      <img
        className="imagePageRecette"
        src={`${apiBaseURL}${recetteCocktail.photo}`}
        alt={recetteCocktail.nom}
      />
      <div className="ingredientsVerre">
        <div className="ingredients">Ingredients</div>
        <div className="verre">Verre :</div>
      </div>
      <div className="preparation">
        <h2>Preparation</h2>
        <p>{recetteCocktail.etapesPreparation}</p>
      </div>
    </>
  );
};

export default PageRecette;
