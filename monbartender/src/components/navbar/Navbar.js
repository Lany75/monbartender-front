import React, { useContext } from "react";
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
import "./NavbarDesktop.css";
import { AuthContext } from "../../context/authContext";
import NavComponent from "./navComponent/NavComponent";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div id="navbar" className="invisible">
      <div id="navbar-css">
        <div id="non-connecte">
          <Link to="/">
            <NavComponent name="Accueil" Icon={TiHome} /*iconSize={35}*/ />
          </Link>

          <Link to="/rechercherparingredients">
            <NavComponent
              name="Recherche par ingrédient"
              Icon={FaSearch}
              /* iconSize={30} */
            />
          </Link>

          <Link to="/recettes">
            <NavComponent
              name="Les recettes"
              Icon={FaGlassMartiniAlt}
              /* iconSize={30} */
            />
          </Link>
        </div>

        {user && (
          <div id="connecte">
            <NavComponent
              name="Mon profil"
              Icon={FaRegUser} /* iconSize={30} */
            />

            <Link to="/monbar">
              <NavComponent
                name="Mon bar"
                Icon={FaWineBottle} /* iconSize={30} */
              />
            </Link>

            <NavComponent
              name="Mes recettes favorites"
              Icon={MdFavoriteBorder}
              /* iconSize={30} */
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
