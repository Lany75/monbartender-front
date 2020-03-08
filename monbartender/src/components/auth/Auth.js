import React, { useContext } from "react";

import "./Auth.css";
import { AuthContext } from "../../context/authContext";
import { useHistory } from "react-router-dom";

const Auth = () => {
  const { user, signOut, signInWithGoogle } = useContext(AuthContext);
  let history = useHistory();

  const connexion = async () => {
    await signInWithGoogle();
    //history.push("/");
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
