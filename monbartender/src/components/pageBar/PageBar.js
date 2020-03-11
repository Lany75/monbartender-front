import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";

import "./PageBar.css";
import AjoutIngredientComponent from "../ajoutIngredientComponent/AjoutIngredientComponent";
import ListeBarComponent from "../listeBarComponent/ListeBarComponent";

// eslint-disable-next-line no-undef

const PageBar = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <>
          <div className="liste-bar">
            <ListeBarComponent />
          </div>
          <AjoutIngredientComponent />
        </>
      ) : (
        <h2>Chargement ...</h2>
      )}
    </>
  );
};
export default PageBar;
