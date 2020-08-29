import React from "react";
import { Switch, Route } from "react-router-dom";
import Accueil from "../accueil/Accueil";
import ListeRecettes from "../listeRecettes/ListeRecettes";
import PageRecette from "../pageRecette/PageRecette";

import PageBar from "../pageBar/PageBar";
import ListeParNom from "../listeParNom/ListeParNom";
import RechercheParIngredient from "../rechercheParIngredient/RechercheParIngredient";
import PageConnexion from "../pageConnexion/PageConnexion";

import "./Main.css";
import "./MainDesktop.css";

import CocktailAleatoire from "../cocktailAleatoire/CocktailAleatoire";
import Gestion from "../gestion/Gestion";
import ModifierCocktailMoment from "../modifierCocktailMoment/ModifierCocktailMoment";
import Page404 from "../page404/Page404";
import MentionsLegales from "../mentionsLegales/MentionsLegales";
import AjoutCocktail from "../ajoutCocktail/AjoutCocktail";
import AjoutIngredient from "../ajoutIngredient/AjoutIngredient";
import ModifierCocktail from "../modifierCocktail/ModifierCocktail";
import AjoutVerre from "../ajoutVerre/AjoutVerre";
import ModifierVerre from "../modifierVerre/ModifierVerre";
import ModifierIngredient from "../modifierIngredient/ModifierIngredient";

function Main() {
  return (
    <div className="main">
      <Switch>
        <Route exact path="/" component={Accueil} />
        <Route exact path="/connexion" component={PageConnexion} />
        <Route
          path="/rechercher-par-ingredient"
          component={RechercheParIngredient}
        />
        <Route exact path="/recettes" component={ListeRecettes} />
        <Route path="/rechercher-par-nom" component={ListeParNom} />
        <Route path="/aleatoire" component={CocktailAleatoire} />
        <Route path="/monbar" component={PageBar} />
        <Route
          path="/gestion/modifier-cocktail-moment/"
          component={ModifierCocktailMoment}
        />
        <Route
          path="/gestion/ajouter-ingredient/"
          component={AjoutIngredient}
        />
        <Route
          path="/gestion/modifier-ingredient/:id"
          component={ModifierIngredient}
        />
        <Route path="/gestion/ajouter-verre/" component={AjoutVerre} />
        <Route path="/gestion/modifier-verre/:id" component={ModifierVerre} />
        <Route path="/gestion/ajouter-cocktail/" component={AjoutCocktail} />
        <Route
          path="/gestion/modifier-cocktail/:id"
          component={ModifierCocktail}
        />
        <Route path="/gestion" component={Gestion} />
        <Route path="/cocktail/:id" component={PageRecette} />
        <Route path="/mentions-legales" component={MentionsLegales} />
        {/* <Route render={() => <div>Y a rien par ici</div>} /> */}
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Main;
