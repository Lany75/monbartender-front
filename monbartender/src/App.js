import React from "react";
import { BrowserRouter } from "react-router-dom";
import FirebaseAuthProvider from "./context/authContext";
import BarProvider from "./context/barContext";
import CocktailProvider from "./context/cocktailContext";

import "./App.css";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import IngredientProvider from "./context/ingredientContext";

function App() {
  return (
    <FirebaseAuthProvider>
      <BarProvider>
        <CocktailProvider>
          <IngredientProvider>
            <BrowserRouter>
              <div className="container">
                <Header />
                <div className="nav-main">
                  <Navbar />
                  <Main />
                </div>
                <div className="footer">
                  <Footer />
                </div>
              </div>
            </BrowserRouter>
          </IngredientProvider>
        </CocktailProvider>
      </BarProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
