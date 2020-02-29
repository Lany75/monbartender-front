import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const modifierCSSNavBarre = () => {
    console.log("on a cliqué sur le menu");
    const divtxtaccueil = document.getElementsByClassName("txtaccueil");
    const divtxtRecherche = document.getElementsByClassName("txtRecherche");
    const divtxtRecettes = document.getElementsByClassName("txtRecettes");
    const divNavBar = document.getElementsByClassName("navbar");

    console.log(divNavBar[0]);
    if (divtxtaccueil[0].style.display === "none") {
      divtxtaccueil[0].style.display = "block";
      divtxtRecherche[0].style.display = "block";
      divtxtRecettes[0].style.display = "block";
      divNavBar[0].style.width = "15vw";
    } else {
      divtxtaccueil[0].style.display = "none";
      divtxtRecherche[0].style.display = "none";
      divtxtRecettes[0].style.display = "none";
      divNavBar[0].style.width = "5vw";
    }
  };

  return (
    <div className="header">
      <div className="menutitre">
        <div
          className="iconMenu"
          onClick={() => {
            modifierCSSNavBarre();
          }}
        >
          <GiHamburgerMenu size={48} />
        </div>
        <div className="titre">Mon BarTender</div>
      </div>
      <div className="inputNom">
        <input
          type="text"
          id="nomCocktail"
          name="nomCocktail"
          placeholder="nom du cocktail"
        />
      </div>
      <div className="iconLogin">
        <FaUserAlt size={44} />
      </div>
    </div>
  );
};

export default Header;
