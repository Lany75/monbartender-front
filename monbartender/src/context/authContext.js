import React, { createContext, useState } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseAppAuth from "../firebaseConfig";
//import firebaseConfig from "../firebaseConfig";

//const firebaseApp = firebase.initializeApp(firebaseConfig);
//const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children, user = null, signInWithGoogle }) {
  const [accessToken, setAccessToken] = useState(null);

  React.useEffect(() => {
    if (user && !accessToken) {
      user.getIdToken().then(res => {
        setAccessToken(res);
      });
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
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
