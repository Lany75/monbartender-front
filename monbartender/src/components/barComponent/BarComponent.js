import React from "react";

import "./BarComponent.css";

const BarComponent = ingredient => {
  const supprimerIngredient = () => {
    console.log("ingredient.nom", ingredient.nom);
    console.log("bouton suppression ingredient cliqué");
  };

  return (
    <>
      <div className="bar">{ingredient.nom}</div>
      <button className="bar" onClick={supprimerIngredient}>
        X
      </button>
    </>
  );
};

export default BarComponent;
