import React, { useContext } from "react";

import { VerreContext } from "../../context/verreContext";

import "./GestionVerres.css";
import "./GestionVerresDesktop.css";

const GestionVerres = () => {
  const { listeVerres } = useContext(VerreContext);

  return (
    <div id="gestion-verres">
      <div id="titre-btn-verres">
        <div id="titre-ajout-verres">Liste verres</div>
        <button id="btn-ajouter-verres">Ajouter</button>
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
