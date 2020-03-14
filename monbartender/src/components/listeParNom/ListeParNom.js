import React, { useState } from "react";
import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";
import ListeRecettes from "../listeRecettes/ListeRecettes";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeParNom = () => {
  const [cocktails, setCocktails] = useState([]);

  const cocktailName = document
    .getElementById("nom-cocktail-recherche")
    .value.toLowerCase();
  //console.log("cocktailName : ", cocktailName);

  const getCocktailByName = () => {
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

  //console.log("cocktails : ", cocktails);

  return (
    <>
      {cocktailName ? (
        cocktails.length !== 0 ? (
          <>
            <h2>Liste des Recettes</h2>
            {<ListeCocktailsComponent cocktails={cocktails} />}
          </>
        ) : (
          <>
            <ListeRecettes />
          </>
        )
      ) : (
        <>
          <ListeRecettes />
        </>
      )}
    </>
  );
};

export default ListeParNom;
