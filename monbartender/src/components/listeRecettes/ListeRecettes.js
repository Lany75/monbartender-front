import React, { useContext } from "react";

import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";

import "./ListeRecettes.css";
import "./ListeRecettesDesktop.css";
import { CocktailContext } from "../../context/cocktailContext";

const ListeRecettes = () => {
  const { listeCocktails } = useContext(CocktailContext);

  return (
    <>
      <h2>Liste des recettes</h2>
      <ListeCocktailsComponent cocktails={listeCocktails} />
    </>
  );
};

export default ListeRecettes;
