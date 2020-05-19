import React, { useState } from "react";
import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";
import Axios from "axios";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const Test = () => {
  const [cocktails, setCocktails] = useState([]);

  const cocktailName = document.getElementById("nomCocktail").value;
  document.getElementById("nomCocktail").value = "";

  const getCocktailByName = () => {
    /*     fetch(`${apiBaseURL}/api/v1/cocktails/rechercher?nom=${cocktailName}`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setCocktails(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      }); */

    Axios.get(`${apiBaseURL}/api/v1/cocktails/rechercher?nom=${cocktailName}`)
      .then(reponse => {
        setCocktails(reponse.data);
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
      <p>Je suis la page de test</p>
      {<ListeCocktailsComponent cocktails={cocktails} />}
    </>
  );
};

export default Test;
