import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="menutitre">
        <div className="iconMenu">
          <GiHamburgerMenu size={48} />
        </div>
        <div className="titre">Mon BarTender</div>
      </div>
      <div>recherche par nom de cocktail</div>
      <div className="iconLogin">
        <FaUserAlt size={44} />
      </div>
    </div>
  );
};

export default Header;
