import React from "react";

import "./Header.css";
import "./HeaderDesktop.css";

import Auth from "./auth/Auth";
import InputRechercheParNom from "./inputRechercheParNom/InputRechercheParNom";

const Header = () => {
  return (
    <div className="header">
      <div className="menu-titre">
        <div id="titre">Mon BarTender</div>
      </div>

      <InputRechercheParNom />

      <Auth />
    </div>
  );
};

export default Header;
