import React, { createContext, useState } from "react";
import Axios from "axios";
export const CocktailContext = createContext();

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

// eslint-disable-next-line react/prop-types
function CocktailProvider({ children }) {
  const [listeCocktails, setListeCocktails] = useState();
  const [listeCocktailsMoment, setListeCocktailsMoment] = useState();

  const getListeCocktails = () => {
    /*     fetch(`${apiBaseURL}/api/v1/cocktails`, {
      method: "GET"
    })
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setListeCocktails(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      }); */

    Axios.get(`${apiBaseURL}/api/v1/cocktails`)
      .then(reponse => {
        setListeCocktails(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const getCocktailsMoment = () => {
    fetch(`${apiBaseURL}/api/v1/cocktails/cocktail-du-moment`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setListeCocktailsMoment(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getListeCocktails();
    getCocktailsMoment();
  }, []);

  return (
    <CocktailContext.Provider
      value={{ listeCocktails, listeCocktailsMoment, setListeCocktailsMoment }}
    >
      {children}
    </CocktailContext.Provider>
  );
}

export default CocktailProvider;
