import React from "react";

import "./Accueil.css";
import "./AccueilDesktop.css";
import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";
import { useContext } from "react";
import { CocktailContext } from "../../context/cocktailContext";

const Accueil = () => {
  const { listeCocktailsMoment } = useContext(CocktailContext);

  return (
    <>
      <div id="titre-cocktail-moment">Cocktails du moment</div>
      <ListeCocktailsComponent cocktails={listeCocktailsMoment} />
    </>
  );
};

export default Accueil;
