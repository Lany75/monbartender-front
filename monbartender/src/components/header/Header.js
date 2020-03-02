import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

import "./Header.css";

const Header = () => {
  const connexion = () => {
    console.log("on a cliqué sur le bouton de connexion");


  };

  
  const modifierCSSNavBarre = () => {
    const divNavBar = document.getElementsByClassName("navbar");

    const divTxtaccueil = document.getElementsByClassName("txtaccueil");
    const divTxtRecherche = document.getElementsByClassName("txtRecherche");
    const divTxtRecettes = document.getElementsByClassName("txtRecettes");

    const divTxtProfil = document.getElementsByClassName("txtProfil");
    const divTxtBar = document.getElementsByClassName("txtBar");
    const divTxtFavoris = document.getElementsByClassName("txtFavoris");

    if (divNavBar[0].classList.value === "navbar") {
      divNavBar[0].classList.add("navBarRetreci");

      divTxtaccueil[0].classList.add("divInvisible");
      divTxtRecherche[0].classList.add("divInvisible");
      divTxtRecettes[0].classList.add("divInvisible");

      divTxtProfil[0].classList.add("divInvisible");
      divTxtBar[0].classList.add("divInvisible");
      divTxtFavoris[0].classList.add("divInvisible");
    } else {
      divNavBar[0].classList.remove("navBarRetreci");

      divTxtaccueil[0].classList.remove("divInvisible");
      divTxtRecherche[0].classList.remove("divInvisible");
      divTxtRecettes[0].classList.remove("divInvisible");

      divTxtProfil[0].classList.remove("divInvisible");
      divTxtBar[0].classList.remove("divInvisible");
      divTxtFavoris[0].classList.remove("divInvisible");
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
      <div
        className="iconLogin"
        onClick={() => {
          connexion();
        }}
      >
        <FaUserAlt size={44} />
      </div>
    </div>
  );
};

export default Header;
