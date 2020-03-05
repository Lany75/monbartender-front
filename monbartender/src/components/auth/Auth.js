import React, { useContext } from "react";

import "./Auth.css";
import { AuthContext } from "../../context/authContext";

const Auth = () => {
  const { user, signOut, signInWithGoogle } = useContext(AuthContext);

  return (
    <div className="connexion">
      {user ? <p>Bonjour, {user.displayName}</p> : <p></p>}
      {user ? (
        <button className='bouton' onClick={signOut}>Déconnexion</button>
      ) : (
        <button className='bouton' onClick={signInWithGoogle}>Connexion</button>
      )}
    </div>
  );
};

export default Auth;
