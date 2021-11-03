import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CocktailAdd from '../../components/cocktailAdd/CocktailAdd';
import CocktailAddNameType from '../../components/cocktailAddNameType/CocktailAddNameType';
import CocktailAddPhoto from '../../components/cocktailAddPhoto/CocktailAddPhoto';
import CocktailAddGlass from '../../components/cocktailAddGlass/CocktailAddGlass';
import CocktailAddIngredients from '../../components/cocktailAddIngredients/CocktailAddIngredients';
import { Button } from '@material-ui/core';
import CocktailAddSteps from '../../components/cocktailAddSteps/CocktailAddSteps';


describe('<CocktailAdd />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    setListeCocktails: jest.fn()
  }));

  const cocktailAdd = shallow(<CocktailAdd />);
  const divCocktailAdd = cocktailAdd.find('div.cocktail-add');

  it('should contain a div with className="cocktail-add"', () => {
    expect(divCocktailAdd).to.have.length(1);
  })

  it('should contain a div with className="cocktail-add-title" and text="Ajout d\'un cocktail"', () => {
    const cocktailAddTitle = divCocktailAdd.find('div.cocktail-add-title');
    expect(cocktailAddTitle).to.have.length(1);
    expect(cocktailAddTitle.text()).to.be.equal("Ajout d'un cocktail");
  })

  const formCocktailAdd = divCocktailAdd.find('form.form-cocktail-add');

  it('should contain a form tag with className="form-cocktail-add" and onSubmit attribute', () => {
    expect(formCocktailAdd).to.have.length(1);
    expect(formCocktailAdd.props()).to.have.property('onSubmit');
  })

  it('should contain a CocktailAddNameType component', () => {
    expect(formCocktailAdd.find(CocktailAddNameType)).to.have.length(1);
  })

  it('should contain a CocktailAddPhoto component', () => {
    expect(formCocktailAdd.find(CocktailAddPhoto)).to.have.length(1);
  })

  it('should contain a CocktailAddGlass component', () => {
    expect(formCocktailAdd.find(CocktailAddGlass)).to.have.length(1);
  })

  it('should contain a CocktailAddIngredients component', () => {
    expect(formCocktailAdd.find(CocktailAddIngredients)).to.have.length(1);
  })

  it('should contain a CocktailAddSteps component', () => {
    expect(formCocktailAdd.find(CocktailAddSteps)).to.have.length(1);
  })

  it('should contain a submit Button component with text "Créer le cocktail"', () => {
    expect(formCocktailAdd.find(Button)).to.have.length(1);
    expect(formCocktailAdd.find(Button).props()).to.have.property('type', 'submit');
    expect(formCocktailAdd.find(Button).text()).to.be.equal('Créer le cocktail');
  })
})