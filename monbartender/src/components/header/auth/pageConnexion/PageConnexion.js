import React, { useContext } from "react";
import { AuthContext } from "../../../../context/authContext";

import { useHistory } from "react-router-dom";

import "./PageConnexion.css";
import "./PageConnexionDesktop.css";

const PageConnexion = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  let history = useHistory();

  const connexion = async () => {
    await signInWithGoogle();

    const divTxtNavItem = document.getElementsByClassName("txt-nav-item");
    console.log(divTxtNavItem);
    for (let i = 0; i < divTxtNavItem.length; i++) {
      divTxtNavItem[i].classList.remove("invisible");
      divTxtNavItem[i].classList.add("visible");
    }

    history.push("/");
  };

  return (
    <div id="connexion">
      <div id="connexion-google">
        <button className="auth-bouton" onClick={connexion}>
          Connexion avec Google
        </button>
      </div>

      <div className="inputs-connexion">
        <input
          type="text"
          id="mail-utilisateur"
          placeholder="mail utilisateur"
        />
        <input type="text" id="mdp-utilisateur" placeholder="mot de passe" />
        <button className="auth-bouton">Valider</button>
      </div>
    </div>
  );
};

export default PageConnexion;
