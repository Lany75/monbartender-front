import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import CocktailAddSteps from '../../components/cocktailAddSteps/CocktailAddSteps';

describe('<CocktailAddSteps />', () => {
  const cocktailAddSteps = shallow(<CocktailAddSteps />);
  const divCocktailAddSteps = cocktailAddSteps.find('div.cocktail-add-steps');

  it('should contain a div with className="cocktail-add-steps"', () => {
    expect(divCocktailAddSteps).to.have.length(1);
  })

  const cocktailAddStepsList = divCocktailAddSteps.find('div.cocktail-add-steps-list')

  it('should contain a div with className="cocktail-add-steps-list"', () => {
    expect(cocktailAddStepsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = cocktailAddStepsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const addDeleteSteps = divCocktailAddSteps.find('div.add-delete-steps')

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

  it('should contain a div with className="message"', () => {
    expect(addDeleteSteps.find('div.message')).to.have.length(1);
  })

  const dialogs = divCocktailAddSteps.find(Dialog);

  it('should contain 2 Dialog components with open and onClose attributes', () => {
    expect(dialogs).to.have.length(2);

    dialogs.forEach(d => {
      expect(d.props()).to.have.property('open');
      expect(d.props()).to.have.property('onClose');
    })
  })

  describe('first Dialog component (add new step dialog)', () => {
    const addNewStepDialog = dialogs.first();
    const dialogTitle = addNewStepDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="form-dialog-title" and text="Ajout de l\'étape "', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Ajout de l\'étape ');
    })

    const dialogContent = addNewStepDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    const dataNewStep = dialogContent.find('div.data-new-step');

    it('should contain a div with className="data-new-step"', () => {
      expect(dataNewStep).to.have.length(1);
    })

    it('should contain a TextField component with value and onChange attribute', () => {
      const textField = dataNewStep.find(TextField);

      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('value');
      expect(textField.props()).to.have.property('onChange');
    })

    const dialogActions = addNewStepDialog.find(DialogActions);

    it('should contain a DialogActions component', () => {
      expect(dialogActions).to.have.length(1);
    })

    it('should contain 2 Button components with onClick attribute', () => {
      const dialogAtionsButton = dialogActions.find(Button);
      expect(dialogAtionsButton).to.have.length(2);
      dialogAtionsButton.map(dab => {
        expect(dab.props()).to.have.property('onClick');
      })
    })
  })

  describe('second Dialog component (modify step dialog)', () => {
    const modifyStepDialog = dialogs.last();
    const dialogTitle = modifyStepDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="form-dialog-title" and text="Modification de l\'étape "', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Modification de l\'étape ');
    })

    const dialogContent = modifyStepDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    const dataStep = dialogContent.find('div.data-step');

    it('should contain a div with className="data-step"', () => {
      expect(dataStep).to.have.length(1);
    })

    it('should contain a TextField component with value and onChange attribute', () => {
      const textField = dataStep.find(TextField);

      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('value');
      expect(textField.props()).to.have.property('onChange');
    })

    const dialogActions = modifyStepDialog.find(DialogActions);

    it('should contain a DialogActions component', () => {
      expect(dialogActions).to.have.length(1);
    })

    it('should contain 2 Button components with onClick attribute', () => {
      const dialogAtionsButton = dialogActions.find(Button);
      expect(dialogAtionsButton).to.have.length(2);
      dialogAtionsButton.map(dab => {
        expect(dab.props()).to.have.property('onClick');
      })
    })
  })
})