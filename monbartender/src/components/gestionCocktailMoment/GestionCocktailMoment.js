import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

import "./GestionCocktailMoment.css";
import "./GestionCocktailMomentDesktop.css";
import { CocktailContext } from "../../context/cocktailContext";
import ImageCocktail from "../imageCocktail/ImageCocktail";

const GestionCocktailMoment = () => {
  const { listeCocktailsMoment } = useContext(CocktailContext);
  let history = useHistory();

  const modifierCocktailMoment = () => {
    history.push("/gestion/modifier-cocktail-moment");
  };

  return (
    <div id="gestion-cocktails-moment">
      <div id="titre-btn-cocktail-moment">
        <div id="titre-gestion-cocktail-moment">Cocktails du moment</div>
        {/* <button
          id="btn-remplacer-cocktail-moment"
          onClick={modifierCocktailMoment}
        >
          Remplacer
        </button> */}
        <Button
          id="btn-remplacer-cocktail-moment"
          variant="contained"
          onClick={modifierCocktailMoment}
        >
          Remplacer
        </Button>
      </div>
      <div id="items-cocktails-moment">
        {listeCocktailsMoment &&
          listeCocktailsMoment.map((cm, index) => {
            return (
              <div className="item-cocktail-moment" key={index}>
                <ImageCocktail
                  classe="img-cocktail-gestion"
                  reference={cm.photo}
                  nom={cm.nom}
                />

                <div id="nom-id-cocktail-moment">
                  <div id="nom-cocktail-moment">{cm.nom}</div>
                  <div id="id-cocktail-moment">{cm.id}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GestionCocktailMoment;
