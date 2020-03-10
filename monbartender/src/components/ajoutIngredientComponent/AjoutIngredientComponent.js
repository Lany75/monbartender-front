import React from "react";

const AjoutIngredientComponent = () => {
  return (
    <>
      {/*
      <div className="suppression-ingredient">
        <div className="liste-deroulante">
          <input placeholder="nouvel ingredient" />
        </div>
        <button className="bouton-ajout">Ajouter l&apos;ingredient</button>
      </div>*/}

      <form action="/:mail" method="POST">
        <input
          className="liste-deroulante"
          type="text"
          name="ingredient"
          placeholder="nouvel ingredient"
        />
        <button className="bouton-ajout" type="submit">
          Ajouter l&apos;ingredient
        </button>
      </form>
    </>
  );
};

export default AjoutIngredientComponent;
