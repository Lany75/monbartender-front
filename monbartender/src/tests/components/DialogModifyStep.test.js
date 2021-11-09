import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import DialogModifyStep from '../../components/dialogModifyStep/DialogModifyStep';

describe('<DialogModifyStep />', () => {
  const dialogModifyStep = shallow(<DialogModifyStep />);
  const dialog = dialogModifyStep.find(Dialog);

  it('should contain a Dialog component with open and onClose attributes', () => {
    expect(dialog).to.have.length(1);
    expect(dialog.props()).to.have.property('open');
    expect(dialog.props()).to.have.property('onClose');
  })

  const dialogTitle = dialog.find(DialogTitle);

  it('should contain a DialogTitle component with id="form-dialog-title" and text="Modification de l\'étape "', () => {
    expect(dialogTitle).to.have.length(1);
    expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
    expect(dialogTitle.text()).to.be.equal('Modification de l\'étape ');
  })

  const dialogContent = dialog.find(DialogContent);

  it('should contain a DialogContent component', () => {
    expect(dialogContent).to.have.length(1);
  })

  it('should contain a TextField component with value and onChange attribute', () => {
    const textField = dialogContent.find(TextField);

    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('value');
    expect(textField.props()).to.have.property('onChange');
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