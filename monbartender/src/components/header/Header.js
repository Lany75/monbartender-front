import React from "react";

import "./Header.css";
import Auth from "../auth/Auth";
import InputRechercheParNom from "../inputRechercheParNom/InputRechercheParNom";
import IconMenu from "../iconMenu/IconMenu";

const Header = () => {
  return (
    <div className="header">
      <div className="menutitre">
        <IconMenu />
        <div className="titre">Mon BarTender</div>
      </div>

      <InputRechercheParNom />

      <div className="auth">
        <Auth />
      </div>
    </div>
  );
};

export default Header;
