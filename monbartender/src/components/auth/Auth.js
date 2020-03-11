import React, { useContext } from "react";
//import axios from "axios";

import "./Auth.css";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line no-undef
//const apiBaseURL = process.env.REACT_APP_BASE_API;

const Auth = () => {
  const { user, signOut, signInWithGoogle } = useContext(AuthContext);

  let history = useHistory();
  //console.log("accessToken dans Auth : ", accessToken);

  const connexion = async () => {
    await signInWithGoogle();
  };

  const deconnexion = () => {
    signOut();
    history.push("/");
  };

  return (
    <div className="connexion">
      {user ? <p>Bonjour, {user.displayName}</p> : <p></p>}
      {user ? (
        <button className="bouton" onClick={deconnexion}>
          Déconnexion
        </button>
      ) : (
        <button className="bouton" onClick={connexion}>
          Connexion
        </button>
      )}
    </div>
  );
};

export default Auth;
