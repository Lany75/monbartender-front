import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

import BarComponent from "../barComponent/BarComponent";

import "./PageBar.css";
import AjoutIngredientComponent from "../ajoutIngredientComponent/AjoutIngredientComponent";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const PageBar = () => {
  const { user, accessToken } = useContext(AuthContext);
  // console.log("user : ", user);
  //console.log("accessToken : ", accessToken);

  const [bar, setBar] = useState();

  const getBarUser = () => {
    user &&
      fetch(`${apiBaseURL}/api/bars/`, {
        method: "GET",
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          return reponse.json();
        })
        .then(data => {
          console.log("data : ", data);
          setBar(data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  React.useEffect(() => {
    getBarUser();
  }, [user]);

  console.log("barrrrrrr : ", bar);

  return (
    <>
      {user ? (
        <>
          <h2>Mon bar</h2>
          <div className="liste-bar">
            {bar && bar[0].Ingredients.length !== 0 ? (
              bar[0].Ingredients.map((b, index) => {
                return (
                  <div key={index} className="bar-component">
                    <BarComponent nom={b.nom} />
                  </div>
                );
              })
            ) : (
              <div>Votre bar est vide ...</div>
            )}
          </div>
          <AjoutIngredientComponent />
        </>
      ) : (
        <h2>Chargement ...</h2>
      )}
    </>
  );
};
export default PageBar;
