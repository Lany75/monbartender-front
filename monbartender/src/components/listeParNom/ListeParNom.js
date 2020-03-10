import React, { useState } from "react";
import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";
import ListeRecettes from "../listeRecettes/ListeRecettes";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeParNom = () => {
  const [cocktails, setCocktails] = useState([]);

  const cocktailName = document
    .getElementById("nomCocktail")
    .value.toLowerCase();

  const getCocktailByName = () => {
    cocktailName &&
      fetch(`${apiBaseURL}/api/cocktails/rechercher?nom=${cocktailName}`)
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setCocktails(data);
          document.getElementById("nomCocktail").value = "";
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
      {cocktailName ? (
        <>
          <h2>Liste des Recettes</h2>
          {<ListeCocktailsComponent cocktails={cocktails} />}
        </>
      ) : (
        <>
          <ListeRecettes />
        </>
      )}
    </>
  );
};

export default ListeParNom;
