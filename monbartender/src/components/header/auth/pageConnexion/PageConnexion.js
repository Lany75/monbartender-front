import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../../../context/authContext";

import "./PageConnexion.css";
import "./PageConnexionDesktop.css";

const PageConnexion = () => {
  const { signInWithGoogle } = useContext(AuthContext);

  let history = useHistory();

  const connexionGoogle = async () => {
    await signInWithGoogle();

    const divTxtNavItem = document.getElementsByClassName("txt-nav-item");
    for (let i = 0; i < divTxtNavItem.length; i++) {
      divTxtNavItem[i].classList.remove("invisible");
      divTxtNavItem[i].classList.add("visible");
    }

    history.push("/");
  };

  const connexionMailPassword = async () => {
    console.log("on veut se connecter avec mail et password");
  };

  const inscriptionMailPassword = async () => {
    console.log("on veut s'inscrire avec mail et password");
    const mailUser = document.getElementById("mail-utilisateur-inscription")
      .value;
    verificationMail(mailUser);
    const passUser = document.getElementById("mdp-utilisateur-inscription")
      .value;
    console.log(passUser);
  };

  const verificationMail = mail => {
    const regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!regex.test(mail)) {
      console.log("mail invalide");
    } else console.log("mail OK");
  };

  return (
    <div id="connexion-inscription">
      <div id="connexion">
        CONNEXION
        <div id="connexion-google">
          <button className="auth-bouton" onClick={connexionGoogle}>
            Connexion avec Google
          </button>
        </div>
        <div className="inputs-connexion">
          <input
            type="text"
            id="mail-utilisateur-connexion"
            placeholder="mail utilisateur"
          />
          <input
            type="text"
            id="mdp-utilisateur-connexion"
            placeholder="mot de passe"
          />
          <button className="auth-bouton" onClick={connexionMailPassword}>
            Connexion
          </button>
        </div>
      </div>
      <div id="inscription">
        INSCRIPTION
        <div className="inputs-inscription">
          <input
            type="text"
            id="nom-utilisateur-inscription"
            placeholder="nom utilisateur"
          />
          <input
            type="text"
            id="mail-utilisateur-inscription"
            placeholder="mail utilisateur"
          />
          <input
            type="text"
            id="mdp-utilisateur-inscription"
            placeholder="mot de passe"
          />
          <button className="auth-bouton" onClick={inscriptionMailPassword}>
            Inscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageConnexion;
