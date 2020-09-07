import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import {
  FaSearch,
  FaGlassMartiniAlt,
  FaRegUser,
  FaWineBottle,
  FaCarrot
} from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { GiRollingDices } from "react-icons/gi";

import "./Navbar.css";
import "./NavbarDesktop.css";
import { AuthContext } from "../../context/authContext";
import NavComponent from "../navComponent/NavComponent";
import { BarContext } from "../../context/barContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { bar } = useContext(BarContext);

  return (
    <>
      <div id="navbar">
        <div id="non-connecte">
          <Link to="/" style={{ textDecoration: "none", color: "black" }}>
            <NavComponent name="Accueil" Icon={TiHome} />
          </Link>

          <Link
            to="/rechercher-par-ingredient"
            style={{ textDecoration: "none", color: "black" }}
          >
            <NavComponent name="Recherche par ingrédient" Icon={FaSearch} />
          </Link>

          <Link
            to="/recettes"
            style={{ textDecoration: "none", color: "black" }}
          >
            <NavComponent name="Les recettes" Icon={FaGlassMartiniAlt} />
          </Link>

          <Link
            to="/aleatoire"
            style={{ textDecoration: "none", color: "black" }}
          >
            <NavComponent name="Au hasard" Icon={GiRollingDices} />
          </Link>
        </div>

        {user && (
          <div id="connecte">
            <NavComponent name="Mon profil" Icon={FaRegUser} />

            <Link
              to="/monbar"
              style={{ textDecoration: "none", color: "black" }}
            >
              <NavComponent name="Mon bar" Icon={FaWineBottle} />
            </Link>

            <NavComponent
              name="Mes recettes favorites"
              Icon={MdFavoriteBorder}
            />
          </div>
        )}
        {user && bar && bar.droits === true && (
          <div id="gerant">
            <Link
              to="/gestion"
              style={{ textDecoration: "none", color: "black" }}
            >
              <NavComponent name="Gestion" Icon={FaCarrot} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
