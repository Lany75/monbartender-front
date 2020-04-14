import React from "react";

import "./Header.css";
import "./HeaderDesktop.css";

import Auth from "./auth/Auth";
import InputRechercheParNom from "./inputRechercheParNom/InputRechercheParNom";
import IconMenu from "./iconMenu/IconMenu";

const Header = () => {
  const toggleOuvertureMenu = () => {
    const divsTxtNavItem = document.getElementsByClassName("txt-nav-item");

    for (let i = 0; i < divsTxtNavItem.length; i++) {
      divsTxtNavItem[i].classList.toggle("invisible");
      divsTxtNavItem[i].classList.toggle("visible");
    }
  };

  return (
    <div className="header">
      <div className="menu-titre">
        <div onClick={toggleOuvertureMenu}>
          <IconMenu />
        </div>
        <div id="titre">Mon BarTender</div>
      </div>

      <InputRechercheParNom />

      <Auth />
    </div>
  );
};

export default Header;
