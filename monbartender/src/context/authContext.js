import React, { createContext, useState } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseAppAuth from "../firebaseConfig";

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children, user = null, signInWithEmailAndPassword, signInWithGoogle, signOut }) {
  const [accessToken, setAccessToken] = useState(null);

  React.useEffect(() => {
    if (user /*&& !accessToken*/) {
      user.getIdToken().then(res => {
        setAccessToken(res);
      });
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  //console.log(accessToken);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signOut,
        accessToken,
        setAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(AuthProvider);
