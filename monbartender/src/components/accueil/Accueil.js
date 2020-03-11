import React, { useState, useContext } from "react";

import "./Accueil.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const initialState = {
  nom: "",
  photo: ""
};

const Accueil = () => {
  const { user } = useContext(AuthContext);
  const [cocktail, setCocktail] = useState(initialState);

  const getCocktailAleatoire = () => {
    fetch(`${apiBaseURL}/api/cocktails/aleatoire`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        setCocktail(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  React.useEffect(() => {
    getCocktailAleatoire();
  }, []);

  const to = "/" + cocktail.id;

  return (
    <>
      {user && <p>Salut, {user.displayName}</p>}
      <h2>Cocktails aléatoire</h2>
      {cocktail && (
        <Link to={to}>
          <div className="cocktail">
            <img
              className="imageRecetteAleatoire"
              src={`${apiBaseURL}${cocktail.photo}`}
              alt={cocktail.nom}
            />
            <div className="nomcocktail">{cocktail.nom}</div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Accueil;
