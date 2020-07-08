import React, { useState, createContext } from "react";
import Axios from "axios";
export const IngredientContext = createContext();

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

// eslint-disable-next-line react/prop-types
function IngredientProvider({ children }) {
  const [listeIngredients, setListeIngredients] = useState();

  const getListeIngredients = () => {
    Axios.get(`${apiBaseURL}/api/v1/ingredients/`)
      .then(reponse => {
        setListeIngredients(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getListeIngredients();
  }, []);

  return (
    <IngredientContext.Provider
      value={{ listeIngredients, setListeIngredients }}
    >
      {children}
    </IngredientContext.Provider>
  );
}

export default IngredientProvider;
