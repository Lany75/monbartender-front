import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import CocktailIngredients from '../../components/cocktailIngredients/CocktailIngredients';
import DialogAddIngredientOfCocktail from '../../components/dialogAddIngredientOfCocktail/DialogAddIngredientOfCocktail';
import DialogErrorMessage from '../../components/dialogErrorMessage/DialogErrorMessage';
import DialogModifyIngredientOfCocktail from '../../components/dialogModifyIngredientOfCocktail/DialogModifyIngredientOfCocktail';

describe('<CocktailIngredients />', () => {
  const cocktailIngredients = shallow(<CocktailIngredients />);
  const divCocktailIngredients = cocktailIngredients.find('div.cocktail-add-ingredients');

  it('should contain a div with className="cocktail-add-ingredients"', () => {
    expect(divCocktailIngredients).to.have.length(1);
  })

  const cocktailIngredientsList = divCocktailIngredients.find('div.cocktail-ingredients-list')

  it('should contain a div with className="cocktail-ingredients-list"', () => {
    expect(cocktailIngredientsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = cocktailIngredientsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const addDeleteIngredients = divCocktailIngredients.find('div.add-delete-ingredients')

  it('should contain a div with className="add-delete-ingredients"', () => {
    expect(addDeleteIngredients).to.have.length(1);
  })

  const buttons = addDeleteIngredients.find(Button);

  it('should contain 2 Button components with onClick attribute', () => {
    expect(buttons).to.have.length(2);
    buttons.map(button => {
      expect(button.props()).to.have.property('onClick');
    })
  })

  it('first button should contain text="Ajouter un ingrédient"', () => {
    expect(buttons.first().text()).to.be.equal('Ajouter un ingrédient');
  })

  it('second button should contain text="Supprimer les ingrédients"', () => {
    expect(buttons.last().text()).to.be.equal('Supprimer les ingrédients');
  })

  it('should contain a DialogAddIngredientOfCocktail component', () => {
    expect(divCocktailIngredients.find(DialogAddIngredientOfCocktail)).to.have.length(1);
  })

  it('should contain a DialogErrorMessage component', () => {
    expect(divCocktailIngredients.find(DialogErrorMessage)).to.have.length(1);
  })

  it('should contain a DialogModifyIngredientOfCocktail component', () => {
    expect(divCocktailIngredients.find(DialogModifyIngredientOfCocktail)).to.have.length(1);
  })
})