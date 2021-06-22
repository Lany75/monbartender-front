import React, { useContext } from "react";

import { BarContext } from "../../context/barContext";
import IngredientBarComponent from "../ingredientBarComponent/IngredientBarComponent";
import LoadingMessage from '../loadingMessage/LoadingMessage';

import "./ListeBarComponent.css";

const ListeBarComponent = () => {
  const { bar } = useContext(BarContext);

  if (bar && bar.Ingredients) {
    bar.Ingredients.sort((a, b) => {
      return a.nom.localeCompare(b.nom);
    });
  }

  return (
    <>
      {!bar ? (
        <LoadingMessage message='Chargement du bar ...' />
      ) : !bar.Ingredients || bar.Ingredients.length === 0 ? (
        <div className="message">Votre bar est vide</div>
      ) : (
        bar.Ingredients.map((b, index) => {
          return (
            <div key={index} id="bar-component">
              <IngredientBarComponent nom={b.nom} />
            </div>
          );
        })
      )}
    </>
  );
};

export default ListeBarComponent;
