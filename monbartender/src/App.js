import React from "react";
import { BrowserRouter } from "react-router-dom";
import FirebaseAuthProvider from "./context/authContext";
//import CocktailProvider from "./context/cocktailContext";
import BarProvider from "./context/barContext";

import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";

function App() {
  return (
    <FirebaseAuthProvider>
      <BarProvider>
        <BrowserRouter>
          <Header />
          <div className="nav-main">
            <Navbar />
            <Main />
          </div>
          <Footer />
        </BrowserRouter>
      </BarProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
