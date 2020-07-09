import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./authContext";
import Axios from "axios";

import apiBaseURL from "../env";

export const BarContext = createContext();

// eslint-disable-next-line react/prop-types
function BarProvider({ children }) {
  const { user, accessToken } = useContext(AuthContext);
  const [bar, setBar] = useState();

  const getBarUser = () => {
    user &&
      accessToken &&
      Axios.get(`${apiBaseURL}/api/v1/bars/`, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          setBar(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  React.useEffect(() => {
    getBarUser();
  }, [user, accessToken]);

  return (
    <BarContext.Provider value={{ bar, setBar }}>
      {children}
    </BarContext.Provider>
  );
}

export default BarProvider;
