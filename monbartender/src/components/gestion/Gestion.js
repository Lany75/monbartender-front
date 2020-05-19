import React from "react";
//import { Link } from "react-router-dom";

import "./Gestion.css";
import "./GestionDesktop.css";
import GestionCocktailMoment from "./gestionCocktailMoment/GestionCocktailMoment";
import GestionCocktails from "./gestionCocktails/GestionCocktails";

const Gestion = () => {
  return (
    <>
      <div id="titre-gestion">Gestion</div>
      <div id="gestion">
        <GestionCocktailMoment />
        <div id="gestion-ingredients">Gestion ingrédients</div>
        <GestionCocktails />
      </div>
    </>
  );
};

export default Gestion;
