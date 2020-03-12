import React, { useContext } from "react";

import BarComponent from "../barComponent/BarComponent";
import { BarContext } from "../../context/barContext";

const ListeBarComponent = () => {
  const { bar } = useContext(BarContext);

  if (bar) {
    bar.Ingredients.sort((a, b) => {
      return a.nom.localeCompare(b.nom);
    });
  }

  return (
    <>
      {!bar ? (
        <div>Chargement du bar ...</div>
      ) : bar.Ingredients.length === 0 ? (
        <div>Votre bar est vide</div>
      ) : (
        bar.Ingredients.map((b, index) => {
          return (
            <div key={index} className="bar-component">
              <BarComponent nom={b.nom} />
            </div>
          );
        })
      )}
    </>
  );
};

export default ListeBarComponent;
