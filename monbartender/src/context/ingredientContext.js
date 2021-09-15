import React, { useState, createContext } from "react";
import Axios from "axios";

import apiBaseURL from "../env";

export const IngredientContext = createContext();

// eslint-disable-next-line react/prop-types
function IngredientProvider({ children }) {
  const [listeIngredients, setListeIngredients] = useState();
  const [listeCategoriesIngredients, setListeCategoriesIngredients] = useState();
  const [unitiesList, setUnitiesList] = useState();

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
    Axios.get(`${apiBaseURL}/api/v2/categories`)
      .then(reponse => {
        setListeCategoriesIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  const getUnitiesList = () => {
    Axios.get(`${apiBaseURL}/api/v2/unities`)
      .then(reponse => {
        setUnitiesList(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  }

  React.useEffect(() => {
    getListeIngredients();
    getListeCategoriesIngredients();
    getUnitiesList();
  }, []);

  return (
    <IngredientContext.Provider
      value={{ listeIngredients, setListeIngredients, listeCategoriesIngredients, setListeCategoriesIngredients, getListeIngredients, unitiesList, setUnitiesList }}
    >
      {children}
    </IngredientContext.Provider>
  );
}

export default IngredientProvider;
