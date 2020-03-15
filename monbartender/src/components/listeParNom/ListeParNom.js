import React, { useState } from "react";
import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";
import ListeRecettes from "../listeRecettes/ListeRecettes";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeParNom = () => {
  const [cocktails, setCocktails] = useState([]);
  let history = useHistory();

  const divcocktailName = document.getElementById("nom-cocktail-recherche");
  let cocktailName;

  if (divcocktailName) cocktailName = divcocktailName.value.toLowerCase();
  console.log("cocktailName : ", cocktailName);

  const getCocktailByName = () => {
    if (!cocktailName) history.push("/");
    if (cocktailName === "" || cocktailName === " ") {
      history.push("/recettes");
    }

    cocktailName &&
      fetch(`${apiBaseURL}/api/cocktails/rechercher?nom=${cocktailName}`)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setCocktails(data);
          document.getElementById("nom-cocktail-recherche").value = "";
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  React.useEffect(() => {
    getCocktailByName();
  }, [cocktailName]);

  return (
    <>
      {cocktailName &&
        (cocktails.length !== 0 ? (
          <>
            <h2>Liste des Recettes</h2>
            {<ListeCocktailsComponent cocktails={cocktails} />}
          </>
        ) : (
          <>
            <p>pas de cocktail à ce nom</p>
            <ListeRecettes />
          </>
        ))}
    </>
  );
};

export default ListeParNom;
