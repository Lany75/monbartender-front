import React, { useState, createContext } from "react";
import Axios from "axios";

import apiBaseURL from "../env";

export const IngredientContext = createContext();

// eslint-disable-next-line react/prop-types
function IngredientProvider({ children }) {
  const [listeIngredients, setListeIngredients] = useState();
  const [listeCategoriesIngredients, setListeCategoriesIngredients] = useState();

  const getListeIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v2/ingredients/`)
      .then(reponse => {
        setListeIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  const getListeCategoriesIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v2/ingredients/categories`)
      .then(reponse => {
        setListeCategoriesIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  React.useEffect(() => {
    getListeIngredients();
    getListeCategoriesIngredients();
  }, []);

  return (
    <IngredientContext.Provider
      value={{ listeIngredients, setListeIngredients, listeCategoriesIngredients, setListeCategoriesIngredients }}
    >
      {children}
    </IngredientContext.Provider>
  );
}

export default IngredientProvider;
