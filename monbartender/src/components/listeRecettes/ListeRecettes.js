import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./ListeRecettes.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeRecettes = () => {
  const [cocktails, setCocktails] = useState([]);
  //const [idCocktail, setIdCocktail] = useState("");

  const getCocktailsdata = () => {
    fetch(`${apiBaseURL}/api/cocktails`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        console.log(data);
        setCocktails(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };
  React.useEffect(() => {
    getCocktailsdata();
  }, []);

  return (
    <>
      <h2>Liste des recettes</h2>
      <div className="listeCocktails">
        {cocktails &&
          cocktails.map((c, index) => {
            const to = "/" + c.id;

            return (
              <Link to={to} key={index}>
                <div className="cocktail">
                  <img
                    className="imagePageListeRecette"
                    src={`${apiBaseURL}${c.photo}`}
                    alt="un cocktail"
                  />
                  <div className="nomcocktail">{c.nom}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default ListeRecettes;
