import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
//import { FaUserAlt } from "react-icons/fa";

import "./Header.css";
import Auth from "../auth/Auth";

const Header = () => {
  //const [isModalVisible, setIsModalVisible] = React.useState(false);

  /*const connexion = () => {
    console.log("on a cliqué sur le bouton de connexion");
    if (isAuthenticated) console.log("on est authentifié");
    else console.log("on n'est pas authentifié");
  };*/

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
      <div className="iconLogin">
        <Auth />
      </div>
    </div>
  );
};

export default Header;

/*<div
        id="auth"
        style={{
          display: isModalVisible ? "block" : "none"
        }}
      >
        <Auth isModalVisible />
      </div> */
//<FaUserAlt size={44} />

/*onClick={() => {
          connexion();
        }}*/
/*onClick={() => {
          setIsModalVisible(prevState => !prevState);
        }}*/
