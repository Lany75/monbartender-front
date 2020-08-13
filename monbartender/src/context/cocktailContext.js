import React, { createContext, useState } from "react";
import Axios from "axios";

import apiBaseURL from "../env";

export const CocktailContext = createContext();

// eslint-disable-next-line react/prop-types
function CocktailProvider({ children }) {
  const [listeCocktails, setListeCocktails] = useState();
  const [listeCocktailsMoment, setListeCocktailsMoment] = useState();

  const getListeCocktails = () => {
    Axios.get(`${apiBaseURL}/api/v1/cocktails?alcool=indifferent`)
      .then(reponse => {
        setListeCocktails(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const getCocktailsMoment = () => {
    Axios.get(`${apiBaseURL}/api/v1/cocktails/cocktail-du-moment`)
      .then(reponse => {
        setListeCocktailsMoment(reponse.data);
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
      value={{
        listeCocktails,
        setListeCocktails,
        listeCocktailsMoment,
        setListeCocktailsMoment,
        getCocktailsMoment
      }}
    >
      {children}
    </CocktailContext.Provider>
  );
}

export default CocktailProvider;
