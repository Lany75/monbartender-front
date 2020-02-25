import React from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nonconnecte">
        <div className="accueil">Accueil</div>
        <div className="recherche">Recherche</div>
        <div className="recette">Les recettes</div>
      </div>

      <div className="connecte">
        <div className="profil">Mon profil</div>
        <div className="bar">Mon bar</div>
        <div className="favorites">Mes recettes favorites</div>
      </div>
    </div>
  );
};

export default Navbar;
