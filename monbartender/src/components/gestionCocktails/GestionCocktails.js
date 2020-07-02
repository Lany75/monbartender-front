import React, { useContext } from "react";
import { CocktailContext } from "../../context/cocktailContext";

import "./GestionCocktails.css";
import "./GestionCocktailsDesktop.css";
import { useHistory } from "react-router-dom";
import ImageCocktail from "../imageCocktail/ImageCocktail";
import Axios from "axios";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const GestionCocktails = () => {
  const { listeCocktails, setListeCocktails } = useContext(CocktailContext);
  let history = useHistory();

  const ajouterCocktail = () => {
    history.push("/gestion/ajouter-cocktail");
  };

  const supprimerCocktail = cocktailId => {
    //console.log("on supprime le cocktail", cocktailId);

    Axios.delete(`${apiBaseURL}/api/v1/cocktails/${cocktailId}`)
      .then(reponse => {
        //console.log(reponse.data);
        setListeCocktails(reponse.data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
  };

  return (
    <>
      <div id="gestion-cocktails">
        <div id="titre-btn-cocktail">
          <div>Liste Cocktails</div>
          <button id="btn-ajouter-cocktail" onClick={ajouterCocktail}>
            Ajouter
          </button>
        </div>
        {listeCocktails &&
          listeCocktails.map((c, index) => {
            return (
              <div className="item-cocktail" key={index}>
                <ImageCocktail
                  classe="img-cocktail-gestion"
                  reference={c.photo}
                  nom={c.nom}
                />

                <div id="nom-id-cocktail">
                  <div id="nom-cocktail">{c.nom}</div>
                  <div id="id-cocktail">{c.id}</div>
                </div>
                <div>
                  <button
                    className="btn-suppression-cocktail"
                    onClick={() => supprimerCocktail(c.id)}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default GestionCocktails;
