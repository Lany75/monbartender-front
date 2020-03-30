import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import "./PageBar.css";
import "./PageBarDesktop.css";

import AjoutIngredientComponent from "./ajoutIngredientComponent/AjoutIngredientComponent";
import ListeBarComponent from "./listeBarComponent/ListeBarComponent";

const PageBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div id="mon-bar">
      {user ? (
        <>
          <div id="titre-mon-bar">Mon Bar</div>
          <div id="liste-bar">
            <ListeBarComponent />
          </div>
          <AjoutIngredientComponent />
        </>
      ) : (
        <h2>Chargement ...</h2>
      )}
    </div>
  );
};
export default PageBar;
