import React, { useContext } from "react";

import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";

import "./ListeRecettes.css";
import "./ListeRecettesDesktop.css";
import { CocktailContext } from "../../context/cocktailContext";

const ListeRecettes = () => {
  const { listeCocktails } = useContext(CocktailContext);

  return (
    <>
      <div id="titre-liste-recettes">Liste des recettes</div>
      <ListeCocktailsComponent cocktails={listeCocktails} />
    </>
  );
};

export default ListeRecettes;
