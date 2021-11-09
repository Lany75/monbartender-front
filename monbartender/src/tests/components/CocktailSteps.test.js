import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import CocktailSteps from '../../components/cocktailSteps/CocktailSteps';
import DialogAddNewStep from '../../components/dialogAddNewStep/DialogAddNewStep';
import DialogModifyStep from '../../components/dialogModifyStep/DialogModifyStep';

describe('<CocktailSteps />', () => {
  const cocktailSteps = shallow(<CocktailSteps />);
  const divCocktailSteps = cocktailSteps.find('div.cocktail-add-steps');

  it('should contain a div with className="cocktail-add-steps"', () => {
    expect(divCocktailSteps).to.have.length(1);
  })

  const cocktailStepsList = divCocktailSteps.find('div.cocktail-steps-list')

  it('should contain a div with className="cocktail-steps-list"', () => {
    expect(cocktailStepsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = cocktailStepsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const addDeleteSteps = divCocktailSteps.find('div.add-delete-steps')

  it('should contain a div with className="add-delete-steps"', () => {
    expect(addDeleteSteps).to.have.length(1);
  })

  const buttons = addDeleteSteps.find(Button);

  it('should contain 2 Button components with onClick attribute', () => {
    expect(buttons).to.have.length(2);
    buttons.map(button => {
      expect(button.props()).to.have.property('onClick');
    })
  })

  it('first button should contain text="Ajouter une étape"', () => {
    expect(buttons.first().text()).to.be.equal('Ajouter une étape');
  })

  it('second button should contain text="Supprimer les étapes"', () => {
    expect(buttons.last().text()).to.be.equal('Supprimer les étapes');
  })

  it('should contain a DialogAddNewStep component', () => {
    expect(divCocktailSteps.find(DialogAddNewStep)).to.have.length(1);
  })

  it('should contain a DialogModifyStep component', () => {
    expect(divCocktailSteps.find(DialogModifyStep)).to.have.length(1);
  })
})