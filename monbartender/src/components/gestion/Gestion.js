import React, { useContext } from "react";
//import { Link } from "react-router-dom";

import "./Gestion.css";
import "./GestionDesktop.css";
import GestionCocktailMoment from "../gestionCocktailMoment/GestionCocktailMoment";
import GestionCocktails from "../gestionCocktails/GestionCocktails";
import { AuthContext } from "../../context/authContext";
import { BarContext } from "../../context/barContext";

const Gestion = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);
  console.log(bar);

  return (
    <>
      {user && bar && bar.droits === true ? (
        <>
          <div id="titre-gestion">Gestion</div>
          <div id="gestion">
            <GestionCocktailMoment />
            <div id="gestion-ingredients">Liste ingrédients</div>
            <GestionCocktails />
          </div>
        </>
      ) : (
        <div>Vous devez avoir les droits pour accéder à cette page</div>
      )}
    </>
  );
};

export default Gestion;
