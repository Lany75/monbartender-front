import React from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import {
  FaSearch,
  FaGlassMartiniAlt,
  FaRegUser,
  FaWineBottle
} from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";

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
            <div className="imgRecettes">
              <FaGlassMartiniAlt size={30} />
            </div>
            <div className="txtRecettes">Les recettes</div>
          </div>
        </Link>
      </div>

      <div className="connecte ">
        <div className="navmenu">
          <div className="imgProfil">
            <FaRegUser size={30} />
          </div>
          <div className="txtProfil">Mon profil</div>
        </div>

        <div className="navmenu">
          <div className="imgBar">
            <FaWineBottle size={30} />
          </div>
          <div className="txtBar">Mon bar</div>
        </div>
        <div className="navmenu">
          <div className="imgBar">
            <MdFavoriteBorder size={30} />
          </div>
          <div className="txtFavoris">Mes recettes favorites</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
