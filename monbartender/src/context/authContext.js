import React, { createContext } from "react";

import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
function AuthProvider({ children, user = null, signOut, signInWithGoogle }) {
  // console.log("user", user);

  return (
    <AuthContext.Provider value={{ user, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(AuthProvider);
