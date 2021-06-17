import React from "react";
import { BrowserRouter } from "react-router-dom";

import FirebaseAuthProvider from "./context/authContext";
import BarProvider from "./context/barContext";
import CocktailProvider from "./context/cocktailContext";
import IngredientProvider from "./context/ingredientContext";
import VerreProvider from "./context/verreContext";

import Header from "./components/header/Header";
import Main from "./components/main/Main";
import "./App.css";

function App() {
  return (
    <FirebaseAuthProvider>
      <BarProvider>
        <CocktailProvider>
          <IngredientProvider>
            <VerreProvider>
              <BrowserRouter>
                <div className="container">
                  <Header />
                  <Main />
                </div>
              </BrowserRouter>
            </VerreProvider>
          </IngredientProvider>
        </CocktailProvider>
      </BarProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
