import React, { useState } from "react";

import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeRecettes = () => {
  const [cocktails, setCocktails] = useState([]);
  //const [idCocktail, setIdCocktail] = useState("");

  const getCocktailsdata = () => {
    fetch(`${apiBaseURL}/api/cocktails`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setCocktails(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };
  React.useEffect(() => {
    getCocktailsdata();
  }, []);

  return (
    <>
      <h2>Liste des recettes</h2>
      <ListeCocktailsComponent cocktails={cocktails} />
    </>
  );
};

export default ListeRecettes;
