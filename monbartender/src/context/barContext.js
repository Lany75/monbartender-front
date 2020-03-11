import React, { createContext, useState, useContext } from "react";
import { AuthContext } from "./authContext";

export const BarContext = createContext();

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

// eslint-disable-next-line react/prop-types
function BarProvider({ children }) {
  const { user, accessToken } = useContext(AuthContext);
  const [bar, setBar] = useState();

  const getBarUser = () => {
    user &&
      accessToken &&
      fetch(`${apiBaseURL}/api/bars/`, {
        // signal,
        method: "GET",
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          setBar(data);
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
