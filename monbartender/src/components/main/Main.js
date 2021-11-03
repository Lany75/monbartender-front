import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MomentCocktails from '../momentCocktails/MomentCocktails';
import AllRecipesList from '../allRecipesList/AllRecipesList';
import ModifierCocktailMoment from '../modifierCocktailMoment/ModifierCocktailMoment';
import Page404 from '../page404/Page404';
import MentionsLegales from '../mentionsLegales/MentionsLegales';
import AjoutCocktail from '../ajoutCocktail/AjoutCocktail';
import ModifierCocktail from '../modifierCocktail/ModifierCocktail';
import SignUp from '../signUp/SignUp';
import SignIn from '../signIn/SignIn';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import SearchPage from '../searchPage/SearchPage';
import ManagementPage from '../managementPage/ManagementPage';
import CocktailRecipe from '../cocktailRecipe/CocktailRecipe';
import UserBar from '../userBar/UserBar';
import CocktailAdd from '../cocktailAdd/CocktailAdd';

function Main() {
  return (
    <div className='main'>
      <Switch>
        <Route exact path='/' component={MomentCocktails} />
        <Route exact path='/inscription' component={SignUp} />
        <Route exact path='/connexion' component={SignIn} />
        <Route exact path='/password-oublie' component={ForgotPassword} />
        <Route exact path='/recherche' component={SearchPage} />
        <Route exact path='/recettes' component={AllRecipesList} />
        <Route path='/monbar' component={UserBar} />
        <Route
          path='/gestion/modifier-cocktail-moment/'
          component={ModifierCocktailMoment}
        />
        <Route path='/gestion/ajouter-cocktail/' component={AjoutCocktail} />
        <Route
          path='/gestion/modifier-cocktail/:id'
          component={ModifierCocktail}
        />
        <Route path='/gestion/nouveau-cocktail/' component={CocktailAdd} />
        <Route path='/gestion' component={ManagementPage} />
        <Route path='/cocktail/:id' component={CocktailRecipe} />
        <Route path='/mentions-legales' component={MentionsLegales} />
        <Route component={Page404} />
      </Switch>
    </div>
  );
}

export default Main;
