import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "../accueil/Accueil";
import Recherche from "../recherche/Recherche";
import ListeRecettes from "../listeRecettes/ListeRecettes";
import PageRecette from "../pageRecette/PageRecette";

import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route path="/recherche" component={Recherche} />
        <Route path="/recettes" component={ListeRecettes} />
        <Route path="/:id" component={PageRecette} />
      </Switch>
    </div>
  );
}

export default Main;
