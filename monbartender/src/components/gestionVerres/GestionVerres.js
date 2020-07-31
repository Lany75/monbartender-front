import React from "react";

import "./GestionVerres.css";
import "./GestionVerresDesktop.css";

const gestionVerres = () => {
  return (
    <div id="gestion-verres">
      <div id="titre-btn-verres">
        <div id="titre-ajout-verres">Liste verres</div>
        <button id="btn-ajouter-verres">Ajouter</button>
      </div>
      <div id="items-verres"></div>
    </div>
  );
};

export default gestionVerres;
