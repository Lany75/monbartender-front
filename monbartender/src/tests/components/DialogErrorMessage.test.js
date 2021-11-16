import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DialogErrorMessage from '../../components/dialogErrorMessage/DialogErrorMessage';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

describe('<DialogErrorMessage />', () => {
  const dialogErrorMessage = shallow(<DialogErrorMessage errorMessage={'Message d\'erreur'} />);
  const dialog = dialogErrorMessage.find(Dialog);

  it('should contain a Dialog component with open and onClose attributes', () => {
    expect(dialog).to.have.length(1);
    expect(dialog.props()).to.have.property('open');
    expect(dialog.props()).to.have.property('onClose');
  })

  const dialogTitle = dialog.find(DialogTitle);

  it('should contain a DialogTitle component with id="alert-dialog-title" and text="Erreur ..."', () => {
    expect(dialogTitle).to.have.length(1);
    expect(dialogTitle.props()).to.have.property('id', 'alert-dialog-title');
    expect(dialogTitle.text()).to.be.equal('Erreur ...');
  })

  const dialogContent = dialog.find(DialogContent);

  it('should contain a DialogContent component', () => {
    expect(dialogContent).to.have.length(1);
  })

  it('should contain a DialogContentText component with text="Message d\'erreur"', () => {
    expect(dialogContent.find(DialogContentText)).to.have.length(1);
    expect(dialogContent.find(DialogContentText).text()).to.be.equal('Message d\'erreur');
  })

  const dialogActions = dialog.find(DialogActions);

  it('should contain a DialogActions component', () => {
    expect(dialogActions).to.have.length(1);
  })

  it('should contain a Button component with onClick attribute and text="Ok"', () => {
    const dialogAtionButton = dialogActions.find(Button);
    expect(dialogAtionButton).to.have.length(1);
    expect(dialogAtionButton.props()).to.have.property('onClick');
    expect(dialogAtionButton.text()).to.be.equal('Ok');
  })
})