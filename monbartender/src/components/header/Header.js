import React from "react";

import "./Header.css";
import "./HeaderDesktop.css";

import InputRechercheParNom from "../inputRechercheParNom/InputRechercheParNom";
import AuthButton from "../authButton/AuthButton";

const Header = () => {
  return (
    <div className="header">
      <div className="menu-titre">
        <div id="titre">Mon BarTender</div>
      </div>
      <InputRechercheParNom />
      <AuthButton />
    </div>
  );
};

export default Header;
