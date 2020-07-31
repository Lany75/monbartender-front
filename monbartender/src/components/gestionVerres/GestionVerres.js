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

  const supprimerVerre = verreId => {
    console.log("suppression verre id: ", verreId);
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
