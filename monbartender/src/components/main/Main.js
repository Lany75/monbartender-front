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
import CocktailAleatoire from "../cocktailAleatoire/CocktailAleatoire";
import Gestion from "../gestion/Gestion";
import ModifierCocktailMoment from "../gestion/gestionCocktailMoment/modifierCocktailMoment/ModifierCocktailMoment";
import AjoutCocktail from "../gestion/gestionCocktails/ajoutCocktail/AjoutCocktail";
//import GestionCocktailMoment from "../gestion/gestionCocktailMoment/GestionCocktailMoment";

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

        <Route path="/rechercherparnom" component={ListeParNom} />
        <Route path="/aleatoire" component={CocktailAleatoire} />
        <Route path="/monbar" component={PageBar} />
        <Route
          path="/gestion/modifier-cocktail-moment/"
          component={ModifierCocktailMoment}
        />
        <Route path="/gestion/ajouter-cocktail/" component={AjoutCocktail} />
        <Route path="/gestion" component={Gestion} />

        {/* <Route
          path="/gestion/cocktail-moment"
          component={GestionCocktailMoment}
        /> */}
        <Route path="/:id" component={PageRecette} />
      </Switch>
    </div>
  );
}

export default Main;
