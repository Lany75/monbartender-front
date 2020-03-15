import React, { useContext } from "react";

import "./BarComponent.css";
import { AuthContext } from "../../../context/authContext";
import { BarContext } from "../../../context/barContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const BarComponent = ingredient => {
  const { user, accessToken } = useContext(AuthContext);

  const { setBar } = useContext(BarContext);

  const supprimerIngredient = nomBouton => {
    const ingredientSupprime = document.getElementById(nomBouton + "-div")
      .innerHTML;

    user &&
      accessToken &&
      fetch(`${apiBaseURL}/api/ingredients/`, {
        method: "DELETE",
        headers: {
          authorization: accessToken,
          ingredientSupprime: ingredientSupprime
        }
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setBar(data);
        });
  };

  // React.useEffect(() => {
  //   console.log("raffraichissement de l'affichage du bar");
  // }, [bar]);

  return (
    <>
      <div className="bar" id={ingredient.nom + "-div"}>
        {ingredient.nom}
      </div>
      <button
        className="bar"
        onClick={() => supprimerIngredient(ingredient.nom)}
      >
        X
      </button>
    </>
  );
};

export default BarComponent;
