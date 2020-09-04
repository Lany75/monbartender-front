import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CreateIcon from "@material-ui/icons/Create";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";
import { VerreContext } from "../../context/verreContext";
import { CocktailContext } from "../../context/cocktailContext";

import "./GestionVerres.css";
import "./GestionVerresDesktop.css";

const GestionVerres = () => {
  let history = useHistory();
  const { accessToken } = useContext(AuthContext);
  const { listeVerres, setListeVerres } = useContext(VerreContext);
  const { listeCocktails } = useContext(CocktailContext);

  const ajouterVerre = () => {
    history.push("/gestion/ajouter-verre");
  };

  const supprimerVerre = verreId => {
    let verreUtil = false;

    for (let i = 0; i < listeCocktails.length; i++) {
      if (listeCocktails[i].verre === verreId) verreUtil = true;
    }

    if (verreUtil === false) {
      Axios.delete(`${apiBaseURL}/api/v1/verres/${verreId}`, {
        headers: {
          authorization: accessToken
        }
      })
        .then(reponse => {
          setListeVerres(reponse.data);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    } else {
      alert("SUPPRESSION IMPOSSIBLE : le verre est utilisé pour un cocktail");
    }
  };

  const modifierVerre = verreId => {
    history.push(`/gestion/modifier-verre/${verreId}`);
  };

  return (
    <div id="gestion-verres">
      <div id="titre-btn-verres">
        <div id="titre-ajout-verres">Liste verres</div>
        <AddCircleIcon id="icon-ajout-verre" onClick={ajouterVerre} />
      </div>
      <div id="items-verres">
        {listeVerres &&
          listeVerres.map((lv, index) => {
            return (
              <div className="item-verre" key={index}>
                <div id="nom-verre-gestion">{lv.nom}</div>
                <div>
                  <DeleteForeverIcon
                    id="icon-suppression-verre"
                    onClick={() => supprimerVerre(lv.id)}
                  />
                  <CreateIcon
                    id="icon-modification-verre"
                    onClick={() => modifierVerre(lv.id)}
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GestionVerres;
