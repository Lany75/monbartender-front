import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const AjoutIngredientComponent = () => {
  const { user, accessToken } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState();
  //console.log("user : ", user);
  //console.log("accessToken : ", accessToken);

  // Aller recuperer la liste de tous les ingredients de la table ingredients
  const getAllIngredients = () => {
    user &&
      fetch(`${apiBaseURL}/api/ingredients/`, {
        method: "GET"
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setIngredients(data);
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
    console.log("nouvelIngredient : ", nouvelIngredient);

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
        console.log("data", data);
      });
  };

  React.useEffect(() => {
    getAllIngredients();
  }, [user]);

  /*React.useEffect(() => {
    getAllIngredients();
  }, [nouvelIngredient]);*/

  return (
    <>
      {/*
      <div className="suppression-ingredient">
        <div className="liste-deroulante">
          <input placeholder="nouvel ingredient" />
        </div>
        <button className="bouton-ajout">Ajouter l&apos;ingredient</button>
      </div>*/}

      {/*<form action="/:mail" method="POST">
        <input
          className="liste-deroulante"
          type="text"
          name="ingredient"
          placeholder="nouvel ingredient"
        />
        <button className="bouton-ajout" type="submit">
          Ajouter l&apos;ingredient
        </button>
    </form>*/}

      <form className="suppression-ingredient">
        <select
          className="liste-deroulante"
          id="liste-deroulante-ajout-ingredient"
          name="test"
        >
          {ingredients &&
            ingredients.map((i, index) => {
              return (
                <option key={index} value={i.nom} name={i.nom}>
                  {i.nom}
                </option>
              );
            })}
        </select>

        {/*<select className="liste-deroulante" name="test">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          </select>*/}
        <button className="bouton-ajout" onClick={ajouterIngredient}>
          Ajouter l&apos;ingredient
        </button>
      </form>
    </>
  );
};

export default AjoutIngredientComponent;
