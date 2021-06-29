import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Accueil from '../accueil/Accueil';
import ListeRecettes from '../listeRecettes/ListeRecettes';
import PageRecette from '../pageRecette/PageRecette';
import ModifierCocktailMoment from '../modifierCocktailMoment/ModifierCocktailMoment';
import Page404 from '../page404/Page404';
import MentionsLegales from '../mentionsLegales/MentionsLegales';
import AjoutCocktail from '../ajoutCocktail/AjoutCocktail';
import AjoutIngredient from '../ajoutIngredient/AjoutIngredient';
import ModifierCocktail from '../modifierCocktail/ModifierCocktail';
import AjoutVerre from '../ajoutVerre/AjoutVerre';
import ModifierVerre from '../modifierVerre/ModifierVerre';
import ModifierIngredient from '../modifierIngredient/ModifierIngredient';
import AjoutAdmin from '../ajoutAdmin/AjoutAdmin';
import SignUp from '../signUp/SignUp';
import SignIn from '../signIn/SignIn';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import SearchPage from '../searchPage/SearchPage';
import PageBar from '../pageBar/PageBar';
import ManagementPage from '../managementPage/ManagementPage';
import './Main.css';
import './MainDesktop.css';


function Main() {
  return (
    <div className='main'>
      <Switch>
        <Route exact path='/' component={Accueil} />
        <Route exact path='/inscription' component={SignUp} />
        <Route exact path='/connexion' component={SignIn} />
        <Route exact path='/password-oublie' component={ForgotPassword} />
        <Route exact path='/recherche' component={SearchPage} />
        <Route exact path='/recettes' component={ListeRecettes} />
        <Route path='/monbar' component={PageBar} />
        <Route
          path='/gestion/modifier-cocktail-moment/'
          component={ModifierCocktailMoment}
        />
        <Route
          path='/gestion/ajouter-ingredient/'
          component={AjoutIngredient}
        />
        <Route
          path='/gestion/modifier-ingredient/:id'
          component={ModifierIngredient}
        />
        <Route path='/gestion/ajouter-verre/' component={AjoutVerre} />
        <Route path='/gestion/modifier-verre/:id' component={ModifierVerre} />
        <Route path='/gestion/ajouter-cocktail/' component={AjoutCocktail} />
        <Route
          path='/gestion/modifier-cocktail/:id'
          component={ModifierCocktail}
        />
        <Route path='/gestion/ajouter-admin' component={AjoutAdmin} />
        <Route path='/gestion' component={ManagementPage} />
        <Route path='/cocktail/:id' component={PageRecette} />
        <Route path='/mentions-legales' component={MentionsLegales} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Main;
