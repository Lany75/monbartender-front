import React, { useContext } from "react";
//import axios from "axios";

import "./Auth.css";
import "./AuthDesktop.css";

import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import { BarContext } from "../../context/barContext";

// eslint-disable-next-line no-undef
//const apiBaseURL = process.env.REACT_APP_BASE_API;

const Auth = () => {
  const { signOut, setAccessToken } = useContext(AuthContext);
  let { user } = useContext(AuthContext);
  const { setBar } = useContext(BarContext);

  let history = useHistory();

  const connexion = async () => {
    history.push("/connexion");
  };

  const deconnexion = () => {
    signOut();
    setBar(null);
    setAccessToken(null);
    user = null;
    history.push("/");
  };

  return (
    <div id="auth">
      {user ? (
        <div id="user">
          <div>Bonjour,</div>
          <div> {user.displayName}</div>
        </div>
      ) : (
        <div></div>
      )}
      {user ? (
        <button className="auth-bouton" onClick={deconnexion}>
          Déconnexion
        </button>
      ) : (
        <button className="auth-bouton" onClick={connexion}>
          Connexion
        </button>
      )}
    </div>
  );
};

export default Auth;