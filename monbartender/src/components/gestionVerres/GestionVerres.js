import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import apiBaseURL from "../../env";

import { AuthContext } from "../../context/authContext";
import { VerreContext } from "../../context/verreContext";

import "./GestionVerres.css";
import "./GestionVerresDesktop.css";

const GestionVerres = () => {
  const { accessToken } = useContext(AuthContext);
  const { listeVerres, setListeVerres } = useContext(VerreContext);
  let history = useHistory();

  const ajouterVerre = () => {
    history.push("/gestion/ajouter-verre");
  };

  const supprimerVerre = verreId => {
    Axios.delete(`${apiBaseURL}/api/v1/gestion/verre/${verreId}`, {
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
  };

  return (
    <div id="gestion-verres">
      <div id="titre-btn-verres">
        <div id="titre-ajout-verres">Liste verres</div>
        <button id="btn-ajouter-verres" onClick={ajouterVerre}>
          Ajouter
        </button>
      </div>
      <div id="items-verres">
        {listeVerres &&
          listeVerres.map((lv, index) => {
            return (
              <div className="item-verre" key={index}>
                <div id="nom-verre-gestion">{lv.nom}</div>
                <div>
                  <button
                    className="btn-suppression-verre"
                    onClick={() => supprimerVerre(lv.id)}
                  >
                    supprimer
                  </button>
                  <button
                    className="btn-modification-verre"
                    // onClick={() => modifierCocktail(c.id)}
                  >
                    modifier
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GestionVerres;
