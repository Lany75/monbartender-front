import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "../accueil/Accueil";
import Recherche from "../recherche/Recherche";
import ListeRecettes from "../listeRecettes/ListeRecettes";
import PageRecette from "../pageRecette/PageRecette";

import "./Main.css";
import PageBar from "../pageBar/PageBar";
import ListeParNom from "../listeParNom/ListeParNom";

function Main() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/rechercherparingredients" component={Recherche} />
        <Route exact path="/recettes" component={ListeRecettes} />
        <Route path="/monbar" component={PageBar} />
        <Route path="/rechercherparnom" component={ListeParNom} />
        <Route path="/:id" component={PageRecette} />
      </Switch>
    </div>
  );
}

export default Main;
