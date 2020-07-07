import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import "./PageBar.css";
import "./PageBarDesktop.css";

import AjoutIngredientBar from "../ajoutIngredientBar/AjoutIngredientBar";
import ListeBarComponent from "../listeBarComponent/ListeBarComponent";

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
          <AjoutIngredientBar />
        </>
      ) : (
        <p>Vous devez vous connecter pour accéder à cette page</p>
      )}
    </div>
  );
};
export default PageBar;
