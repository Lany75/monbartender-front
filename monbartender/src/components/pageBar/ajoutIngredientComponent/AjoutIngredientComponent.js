import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { BarContext } from "../../../context/barContext";

import "./AjoutIngredientComponent.css";
import "./AjoutIngredientComponentDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const AjoutIngredientComponent = () => {
  const { user, accessToken } = useContext(AuthContext);
  const { setBar } = useContext(BarContext);
  const [allIngredients, setAllIngredients] = useState();

  // Recuperer la liste de tous les ingredients de la table ingredients
  const getAllIngredients = () => {
    user &&
      fetch(`${apiBaseURL}/api/ingredients/`, {
        method: "GET"
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setAllIngredients(data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  const ajouterIngredient = event => {
    event.preventDefault();
    const nouvelIngredient = document.getElementById(
      "liste-deroulante-ajout-ingredient"
    ).value;

    fetch(`${apiBaseURL}/api/ingredients/`, {
      method: "POST",
      headers: {
        authorization: accessToken,
        nouvelingredient: nouvelIngredient
      }
    })
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setBar(data);
      });
  };

  React.useEffect(() => {
    getAllIngredients();
  }, [user]);

  return (
    <>
      <form id="formulaire-ajout-ingredient">
        <select id="liste-deroulante-ajout-ingredient" name="test">
          {allIngredients &&
            allIngredients.map((i, index) => {
              return (
                <option key={index} value={i.nom} name={i.nom}>
                  {i.nom}
                </option>
              );
            })}
        </select>
        <button id="btn-ajout-ingredient" onClick={ajouterIngredient}>
          Ajouter l&apos;ingredient
        </button>
      </form>
    </>
  );
};

export default AjoutIngredientComponent;
