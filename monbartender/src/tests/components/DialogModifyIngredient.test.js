import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DialogModifyIngredient from '../../components/dialogModifyIngredient/DialogModifyIngredient';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

const unitiesListTest = [
  {
    id: "e62f73e2-fa06-4f66-bc5a-47e349e1a6cd",
    nom: "cl"
  },
  {
    id: "0a02c041-235d-4382-892d-72b87ea000fa",
    nom: "feuille(s)"
  },
  {
    id: "0fee5a7d-fe97-47f9-bb5d-b9ea5cebd665",
    nom: "goutte(s)"
  },
  {
    id: "70a07305-7a87-48c2-97d9-db69b2b53953",
    nom: "gr"
  },
  {
    id: "9e6559ce-197f-43b6-8cb6-2bbe7fc3df73",
    nom: "ml"
  }
];

describe('<DialogModifyIngredient />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    unitiesList: unitiesListTest,
  }));

  const dialogModifyIngredient = shallow(<DialogModifyIngredient />);
  const dialog = dialogModifyIngredient.find(Dialog);

  it('should contain a Dialog component with open and onClose attributes', () => {
    expect(dialog).to.have.length(1);
    expect(dialog.props()).to.have.property('open');
    expect(dialog.props()).to.have.property('onClose');
  })

  const dialogTitle = dialog.find(DialogTitle);

  it('should contain a DialogTitle component with id="form-dialog-title" and text="Modification de la quantité"', () => {
    expect(dialogTitle).to.have.length(1);
    expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
    expect(dialogTitle.text()).to.be.equal('Modification de la quantité');
  })

  const dialogContent = dialog.find(DialogContent);

  it('should contain a DialogContent component', () => {
    expect(dialogContent).to.have.length(1);
  })

  it('should contain a DialogContentText component with text="Modifier la quantité pour l\'ingrédient "', () => {
    expect(dialogContent.find(DialogContentText)).to.have.length(1);
    expect(dialogContent.find(DialogContentText).text()).to.be.equal('Modifier la quantité pour l\'ingrédient ');
  })

  const dataIngredient = dialogContent.find('div.data-ingredient');

  it('should contain a div with className="data-ingredient"', () => {
    expect(dataIngredient).to.have.length(1);
  })

  const quantity = dataIngredient.find('div.quantity');

  it('should contain a div with className="quantity"', () => {
    expect(quantity).to.have.length(1);
  })

  it('should contain a TextField component with label, value and onChange attribute', () => {
    const textField = quantity.find(TextField);

    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('label', 'quantité');
    expect(textField.props()).to.have.property('value');
    expect(textField.props()).to.have.property('onChange');
  })

  const unity = dataIngredient.find('div.unity');

  it('should contain a div with className="unity"', () => {
    expect(unity).to.have.length(1);
  })

  const formControlUnity = unity.find(FormControl);

  it('should contain a FormControl component', () => {
    expect(formControlUnity).to.have.length(1);
  })

  it('should contain an InputLabel component with id="label-unity" and text="Unité"', () => {
    const inputLabel = formControlUnity.find(InputLabel);
    expect(inputLabel).to.have.length(1);
    expect(inputLabel.props()).to.have.property('id', 'label-unity');
    expect(inputLabel.text()).to.be.equal('Unité');
  })

  const selectUnity = formControlUnity.find(Select);

  it('should contain a Select component with className="form-control-select", label="Unité" and onChange attribute', () => {
    expect(selectUnity).to.have.length(1);
    expect(selectUnity.props()).to.have.property('className', 'form-control-select');
    expect(selectUnity.props()).to.have.property('label', 'Unité');
    expect(selectUnity.props()).to.have.property('onChange');
  })

  const menuItemUnity = selectUnity.find(MenuItem);

  it('should contain 5 MenuItem components', () => {
    expect(menuItemUnity).to.have.length(5);
  })

  const dialogActions = dialog.find(DialogActions);

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