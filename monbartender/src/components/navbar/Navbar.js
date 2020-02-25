import React from "react";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { FaSearch, FaGlassMartiniAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nonconnecte">
        <div className="navmenu">
          <Link to="/">
            <TiHome size={40} />
            Accueil
          </Link>
        </div>
        <div className="navmenu">
          <Link to="/recherche">
            <FaSearch size={30} />
            Recherche par ingrédient
          </Link>
        </div>
        <div className="navmenu">
          <Link to="/recettes">
            <FaGlassMartiniAlt size={30} />
            Les recettes
          </Link>
        </div>
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
