import React from "react";

import "./Header.css";
import "./HeaderDesktop.css";

import Auth from "./auth/Auth";
import InputRechercheParNom from "./inputRechercheParNom/InputRechercheParNom";
import IconMenu from "./iconMenu/IconMenu";

const Header = () => {
  /* const toggleAffichageNavbar = () => {
    const navbar = document.getElementById("navbar");
    //const divTxtNavBar = document.getElementsbyClassName("txt-nav-item");
    // console.log("divTxtNavBar", divTxtNavBar);
    const classNavbar = navbar.getAttribute("class");
    if (classNavbar === "invisible") {
      navbar.setAttribute("class", "visible");
    } else {
      navbar.setAttribute("class", "invisible");
    }
  }; */

  const toggleOuvertureMenu = () => {
    // console.log("ouverture navbar");
    const divsTxtNavItem = document.getElementsByClassName("txt-nav-item");
    // console.log(divsTxtNavItem);
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
