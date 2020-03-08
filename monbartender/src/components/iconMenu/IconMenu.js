import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
//import { AuthContext } from "../../context/authContext";

import "./IconMenu.css";

const IconMenu = () => {
  //const { user } = useContext(AuthContext);

  const modifierCSSNavBarre = () => {
    /*if (user) {
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
    } else {
      const divNavBar = document.getElementsByClassName("navbar");

      const divTxtaccueil = document.getElementsByClassName("txtaccueil");
      const divTxtRecherche = document.getElementsByClassName("txtRecherche");
      const divTxtRecettes = document.getElementsByClassName("txtRecettes");

      if (divNavBar[0].classList.value === "navbar") {
        divNavBar[0].classList.add("navBarRetreci");

        divTxtaccueil[0].classList.add("divInvisible");
        divTxtRecherche[0].classList.add("divInvisible");
        divTxtRecettes[0].classList.add("divInvisible");
      } else {
        divNavBar[0].classList.remove("navBarRetreci");

        divTxtaccueil[0].classList.remove("divInvisible");
        divTxtRecherche[0].classList.remove("divInvisible");
        divTxtRecettes[0].classList.remove("divInvisible");
      }
    }*/
  };

  return (
    <div
      className="iconMenu"
      onClick={() => {
        modifierCSSNavBarre();
      }}
    >
      <GiHamburgerMenu size={48} />
    </div>
  );
};

export default IconMenu;
