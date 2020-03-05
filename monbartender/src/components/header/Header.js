import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import "./Header.css";
import Auth from "../auth/Auth";
import { AuthContext } from "../../context/authContext";

// eslint-disable-next-line no-undef
const apiBaseURL = process.env.REACT_APP_BASE_API;

const Header = () => {
  const { user } = useContext(AuthContext);
  const [cocktails, setCocktails] = useState([]);

  const modifierCSSNavBarre = () => {
    if (user) {
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
    }
  };

  const getCocktailsByName = () => {
    const cocktailName = document.getElementById("nomCocktail").value;
    console.log(
      "URL du fetch : ",
      apiBaseURL + "/api/cocktails/rechercher?" + cocktailName
    );

    fetch(`${apiBaseURL}/api/cocktails/rechercher?nom=${cocktailName}`)
      .then(reponse => {
        return reponse.json();
      })
      .then(data => {
        console.log("data", data);
        setCocktails(data);
      })
      .catch(error => {
        console.log("vous avez une erreur : ", error);
      });
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
          onKeyUp={() => getCocktailsByName()}
        />
      </div>
      <div className="iconLogin">
        <Auth />
      </div>
    </div>
  );
};

export default Header;
