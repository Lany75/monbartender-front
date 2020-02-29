import React from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaSearch, FaGlassMartiniAlt } from "react-icons/fa";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nonconnecte">
        <Link to="/">
          <div className="navmenu">
            <div className="imgaccueil">
              <TiHome size={40} />
            </div>
            <div className="txtaccueil">Accueil</div>
          </div>
        </Link>

        <Link to="/recherche">
          <div className="navmenu">
            <div className="imgRecherche">
              <FaSearch size={30} />
            </div>
            <div className="txtRecherche">Recherche par ingrédient</div>
          </div>
        </Link>

        <Link to="/recettes">
          <div className="navmenu">
            <div className="imgRecherche">
              <FaGlassMartiniAlt size={30} />
            </div>
            <div className="txtRecettes">Les recettes</div>
          </div>
        </Link>
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
