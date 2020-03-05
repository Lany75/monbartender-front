import React, { useContext } from "react";

import "./Auth.css";
import { AuthContext } from "../../context/authContext";

const Auth = () => {
  const { user, signOut, signInWithGoogle } = useContext(AuthContext);
  console.log("user", user);

  return (
    <>
      {user ? <p>Bonjour, {user.displayName}</p> : <p></p>}
      {user ? (
        <button onClick={signOut}>Déconnexion</button>
      ) : (
        <button onClick={signInWithGoogle}>Connexion</button>
      )}
    </>
  );
};

export default Auth;
