import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { VerreContext } from "../../context/verreContext";

import "./GestionVerres.css";
import "./GestionVerresDesktop.css";

const GestionVerres = () => {
  const { listeVerres } = useContext(VerreContext);
  let history = useHistory();

  const ajouterVerre = () => {
    history.push("/gestion/ajouter-verre");
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
              <div id="nom-verre-gestion" key={index}>
                {lv.nom}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default GestionVerres;
