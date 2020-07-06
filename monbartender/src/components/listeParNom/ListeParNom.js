import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";

import ListeRecettes from "../listeRecettes/ListeRecettes";
import ComposantListeRecettes from "../composantListeRecettes/ComposantListeRecettes";

import "./ListeParNom.css";
import "./ListeParNomDesktop.css";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const ListeParNom = () => {
  const [cocktails, setCocktails] = useState([]);
  let history = useHistory();

  const divcocktailName = document.getElementById("nom-cocktail-recherche");
  let cocktailName;

  if (divcocktailName) cocktailName = divcocktailName.value.toLowerCase();

  const getCocktailByName = () => {
    if (!cocktailName) history.push("/");
    if (cocktailName === "" || cocktailName === " ") {
      history.push("/recettes");
    }

    cocktailName &&
      Axios.get(
        `${apiBaseURL}/api/v1/cocktails/rechercher-par-nom?nom=${cocktailName}`
      )
        .then(reponse => {
          setCocktails(reponse.data);
          document.getElementById("nom-cocktail-recherche").value = "";
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
  };

  React.useEffect(() => {
    getCocktailByName();
  }, [cocktailName]);

  return (
    <>
      {cocktailName &&
        (cocktails.length !== 0 ? (
          <>
            <div id="titre-liste-recettes">Liste des Recettes</div>
            <div id="liste-cocktails">
              {cocktails &&
                cocktails.map((c, index) => {
                  const to = "/cocktail/" + c.id;
                  return (
                    <Link to={to} key={index}>
                      <ComposantListeRecettes nom={c.nom} photo={c.photo} />
                    </Link>
                  );
                })}
            </div>
          </>
        ) : (
          <>
            <p>pas de cocktail à ce nom</p>
            <ListeRecettes />
          </>
        ))}
    </>
  );
};

export default ListeParNom;
