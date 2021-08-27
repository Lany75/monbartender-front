import React, { useState, createContext } from "react";
import Axios from "axios";

import apiBaseURL from "../env";

export const VerreContext = createContext();

// eslint-disable-next-line react/prop-types
function VerreProvider({ children }) {
  const [listeVerres, setListeVerres] = useState([]);

  const getListeVerres = () => {
    Axios.get(`${apiBaseURL}/api/v2/glasses/`)
      .then(reponse => {
        setListeVerres(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getListeVerres();
  }, []);

  return (
    <VerreContext.Provider value={{ listeVerres, setListeVerres }}>
      {children}
    </VerreContext.Provider>
  );
}

export default VerreProvider;
