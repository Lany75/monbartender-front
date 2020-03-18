import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import { BarContext } from "../../../context/barContext";

import "./AjoutIngredientComponentMobile.css";

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
    console.log("on a cliqué sur le bouton ajouter");
    const nouvelIngredient = document.getElementById(
      "liste-deroulante-ajout-ingredient"
    ).value;
    //console.log("nouvelIngredient : ", nouvelIngredient);

    // fetch sur la route post
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
        //console.log("data", data);
        //console.log("data : ", data);
        setBar(data);
        //history.push("/monbar");
      });
  };

  React.useEffect(() => {
    getAllIngredients();
  }, [user]);

  /*    React.useEffect(() => {
    getAllIngredients();
  }, [ingredients]);  */

  return (
    <>
      <form id="formulaire-ajout-ingredient">
        <select
          //className="liste-deroulante"
          id="liste-deroulante-ajout-ingredient"
          name="test"
        >
          {allIngredients &&
            allIngredients.map((i, index) => {
              return (
                <option
                  // className="option-formulaire-ajout"
                  key={index}
                  value={i.nom}
                  name={i.nom}
                >
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
