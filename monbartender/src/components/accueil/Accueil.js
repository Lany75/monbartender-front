import React from "react";

import "./Accueil.css";
import "./AccueilDesktop.css";
import { useContext } from "react";
import { CocktailContext } from "../../context/cocktailContext";
import { Link } from "react-router-dom";
import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";

const Accueil = () => {
  const { listeCocktailsMoment } = useContext(CocktailContext);

  return (
    <>
      <div id="titre-cocktail-moment">Cocktails du moment</div>
      <div id="liste-cocktails">
        {listeCocktailsMoment &&
          listeCocktailsMoment.map((c, index) => {
            const to = "/cocktail/" + c.id;
            return (
              <Link to={to} key={index}>
                <ComposantListeRecettes nom={c.nom} photo={c.photo} />
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Accueil;
