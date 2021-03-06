import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import apiBaseURL from "../../env";

import { CocktailContext } from "../../context/cocktailContext";
import { AuthContext } from "../../context/authContext";

import ImageCocktail from "../imageCocktail/ImageCocktail";

import "./GestionCocktails.css";
import "./GestionCocktailsDesktop.css";

const GestionCocktails = () => {
  const { accessToken } = useContext(AuthContext);
  const { listeCocktails, setListeCocktails } = useContext(CocktailContext);
  const { listeCocktailsMoment } = useContext(CocktailContext);
  let history = useHistory();

  const ajouterCocktail = () => {
    history.push("/gestion/ajouter-cocktail");
  };

  const supprimerCocktail = cocktailId => {
    if (
      cocktailId !== listeCocktailsMoment[0].id &&
      cocktailId !== listeCocktailsMoment[1].id
    ) {
      Axios.delete(`${apiBaseURL}/api/v1/gestion/cocktail/${cocktailId}`, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          setListeCocktails(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    } else {
      alert("SUPPRESSION IMPOSSIBLE : le cocktail est un cocktail du moment");
    }
  };

  const modifierCocktail = cocktailId => {
    history.push(`/gestion/modifier-cocktail/${cocktailId}`);
  };

  return (
    <>
      <div id="gestion-cocktails">
        <div id="titre-btn-cocktail">
          <div id="titre-gestion-cocktail">Liste Cocktails</div>
          <AddCircleIcon id="icon-ajout-cocktail" onClick={ajouterCocktail} />
        </div>
        <div id="items-cocktails">
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
                  </div>
                  <div>
                    <DeleteForeverIcon
                      id="icon-suppression-cocktail"
                      onClick={() => supprimerCocktail(c.id)}
                    />
                    <CreateIcon
                      id="icon-modification-cocktail"
                      onClick={() => modifierCocktail(c.id)}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default GestionCocktails;
