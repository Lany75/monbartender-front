import React, { useContext } from "react";
import { CocktailContext } from "../../../context/cocktailContext";

import "./GestionCocktails.css";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

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
                  <img
                    id="img-cocktail"
                    src={`${apiBaseURL}${cm.photo}`}
                    alt="un cocktail"
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
