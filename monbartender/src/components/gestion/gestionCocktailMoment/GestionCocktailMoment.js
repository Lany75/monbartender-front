import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import "./GestionCocktailMoment.css";
import { CocktailContext } from "../../../context/cocktailContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const GestionCocktailMoment = () => {
  const { listeCocktailsMoment } = useContext(CocktailContext);
  let history = useHistory();

  const modifierCocktailMoment = () => {
    history.push("/gestion/modifier-cocktail-moment");
  };

  return (
    <div id="gestion-cocktails-moment">
      <div id="titre-btn-cocktail-moment">
        <div>Cocktails du moment</div>
        <button
          id="btn-remplacer-cocktail-moment"
          onClick={modifierCocktailMoment}
        >
          Remplacer
        </button>
      </div>
      <ul>
        {listeCocktailsMoment &&
          listeCocktailsMoment.map((cm, index) => {
            return (
              <li className="item-cocktail-moment" key={index}>
                <img
                  id="img-cocktail-moment"
                  src={`${apiBaseURL}${cm.photo}`}
                />
                <div id="nom-id-cocktail-moment">
                  <div id="nom-cocktail-moment">{cm.nom}</div>
                  <div id="id-cocktail-moment">{cm.id}</div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default GestionCocktailMoment;
