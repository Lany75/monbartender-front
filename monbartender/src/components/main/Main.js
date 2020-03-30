import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "../accueil/Accueil";
import ListeRecettes from "../listeRecettes/ListeRecettes";
import PageRecette from "../pageRecette/PageRecette";

import PageBar from "../pageBar/PageBar";
import ListeParNom from "../listeParNom/ListeParNom";
import RechercheParIngredient from "../rechercheParIngredient/RechercheParIngredient";
import PageConnexion from "../header/auth/pageConnexion/PageConnexion";

import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/connexion" component={PageConnexion} />
        <Route
          path="/rechercherparingredients"
          component={RechercheParIngredient}
        />
        <Route exact path="/recettes" component={ListeRecettes} />
        <Route path="/monbar" component={PageBar} />
        <Route path="/rechercherparnom" component={ListeParNom} />
        <Route path="/:id" component={PageRecette} />
      </Switch>
    </div>
  );
}

export default Main;
