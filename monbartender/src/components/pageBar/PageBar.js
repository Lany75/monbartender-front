import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import "./PageBarMobile.css";
import AjoutIngredientComponent from "./ajoutIngredientComponent/AjoutIngredientComponent";
import ListeBarComponent from "./listeBarComponent/ListeBarComponent";

const PageBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div id="mon-bar">
      {user ? (
        <>
          <h2>Mon Bar</h2>
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
