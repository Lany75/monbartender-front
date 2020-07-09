import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CocktailContext } from "../../context/cocktailContext";
import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";

import "./ListeRecettes.css";
import "./ListeRecettesDesktop.css";

const ListeRecettes = () => {
  const { listeCocktails } = useContext(CocktailContext);

  return (
    <>
      <div id="titre-liste-recettes">Liste des recettes avec alcool</div>
      <div id="liste-cocktails">
        {listeCocktails &&
          listeCocktails.map((c, index) => {
            if (c.alcool === true) {
              const to = "/cocktail/" + c.id;
              return (
                <Link to={to} key={index}>
                  <ComposantListeRecettes nom={c.nom} photo={c.photo} />
                </Link>
              );
            } else return true;
          })}
      </div>
      <div id="titre-liste-recettes">Liste des recettes sans alcool</div>
      <div id="liste-cocktails">
        {listeCocktails &&
          listeCocktails.map((c, index) => {
            if (c.alcool === false) {
              const to = "/cocktail/" + c.id;
              return (
                <Link to={to} key={index}>
                  <ComposantListeRecettes nom={c.nom} photo={c.photo} />
                </Link>
              );
            } else return true;
          })}
      </div>
    </>
  );
};

export default ListeRecettes;
