import React, { useState } from "react";

import "./Accueil.css";
import "./AccueilDesktop.css";
import ListeCocktailsComponent from "../listeCocktailsComponent/ListeCocktailsComponent";

//import { AuthContext } from "../../context/authContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

/* const initialState = {
  id: "",
  nom: "",
  photo: ""
}; */

const Accueil = () => {
  //  const { user } = useContext(AuthContext);
  const [cocktailsMoment, setCocktailsMoment] = useState();

  const getCocktailsMoment = () => {
    fetch(`${apiBaseURL}/api/cocktails/cocktail-du-moment`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setCocktailsMoment(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getCocktailsMoment();
  }, []);

  return (
    <>
      <div id="titre-cocktail-moment">Cocktails du moment</div>
      <ListeCocktailsComponent cocktails={cocktailsMoment} />
    </>
  );
};

export default Accueil;
