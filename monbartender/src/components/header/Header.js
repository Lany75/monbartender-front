import React from "react";

import "./HeaderDesktop.css";
import "./HeaderMobile.css";
import Auth from "./auth/Auth";
import InputRechercheParNom from "./inputRechercheParNom/InputRechercheParNom";
import IconMenu from "./iconMenu/IconMenu";

const Header = () => {
  return (
    <div className="header">
      <div className="menu-titre">
        <IconMenu />
        <div id="titre">Mon BarTender</div>
      </div>

      <InputRechercheParNom />

      <Auth />
    </div>
  );
};

export default Header;
