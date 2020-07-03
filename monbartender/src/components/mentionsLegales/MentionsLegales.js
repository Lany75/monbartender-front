import React from "react";

import "./MentionsLegales.css";
import "./MentionsLegalesDesktop.css";

const MentionsLegales = () => {
  return (
    <div id="mentions-legales">
      <div id="titre-mentions-legales">Mentions Legales</div>
      <div id="creatrice">
        Application créée par Mélanie PARRY (mlanie.parry@gmail.com)
      </div>

      <div id="remerciement">
        Remerciement pour les photos :
        <ul id="liste-photographe">
          <li>Hessam Hojati</li>
          <li>Jenny Pace</li>
          <li>Rhianon Lassila</li>
          <li>Tai&apos;s Captures</li>
          <li>Michael Oeser</li>
        </ul>
      </div>
    </div>
  );
};

export default MentionsLegales;
