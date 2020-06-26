import React, { useContext } from "react";
import { CocktailContext } from "../../context/cocktailContext";

import "./GestionCocktails.css";
import "./GestionCocktailsDesktop.css";
import { useHistory } from "react-router-dom";
import ImageCocktail from "../imageCocktail/ImageCocktail";

const GestionCocktails = () => {
  const { listeCocktails } = useContext(CocktailContext);
  let history = useHistory();

  const ajouterCocktail = () => {
    history.push("/gestion/ajouter-cocktail");
  };
  return (
    <>
      <div id="gestion-cocktails">
        <div id="titre-btn-cocktail">
          <div>Liste Cocktails</div>
          <button id="btn-ajouter-cocktail" onClick={ajouterCocktail}>
            Ajouter
          </button>
        </div>
        <ul>
          {listeCocktails &&
            listeCocktails.map((cm, index) => {
              return (
                <li className="item-cocktail" key={index}>
                  <ImageCocktail
                    classe="img-cocktail-gestion"
                    reference={cm.photo}
                    nom={cm.nom}
                  />

                  <div id="nom-id-cocktail">
                    <div id="nom-cocktail">{cm.nom}</div>
                    <div id="id-cocktail">{cm.id}</div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default GestionCocktails;
