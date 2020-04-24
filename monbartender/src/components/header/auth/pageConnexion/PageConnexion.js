import React, { useContext } from "react";
import { AuthContext } from "../../../../context/authContext";

import { useHistory } from "react-router-dom";

import "./PageConnexion.css";
import "./PageConnexionDesktop.css";

const PageConnexion = () => {
  console.log("on est dans PageConnexion");

  const { signInWithGoogle } = useContext(AuthContext);

  let history = useHistory();

  const connexion = async () => {
    console.log("on a cliqué sur le bouton connexion avec google");
    await signInWithGoogle();
    console.log("on a fait signInWithGoogle");

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
