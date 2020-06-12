import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import RechercheParIngredientConnecte from "../rechercheParIngredientConnecte/RechercheParIngredientConnecte";
import RechercheParIngredientNonConnecte from "../rechercheParIngredientNonConnecté/RechercheParIngredientNonConnecte";

const RechercheParIngredient = () => {
  const { user } = useContext(AuthContext);

  return user ? (
    <>
      <RechercheParIngredientConnecte />
    </>
  ) : (
    <>
      <RechercheParIngredientNonConnecte />
    </>
  );
};

export default RechercheParIngredient;
