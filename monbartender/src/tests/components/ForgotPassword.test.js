import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Container, Typography, TextField, Button } from '@material-ui/core';

import ForgotPassword from '../../components/forgotPassword/ForgotPassword';

describe('<ForgotPassword />', () => {
  const forgotPassword = shallow(<ForgotPassword />);

  it('should contain a div witch className="password-message"', () => {
    expect(forgotPassword.find('div.password-message')).to.have.length(1);
  })

  const container = forgotPassword.find(Container);

  it('should contain a Container component', () => {
    expect(container).to.have.length(1);
  })

  const divPassword = container.find('div.password')

  it('should contain a div witch className="password"', () => {
    expect(divPassword).to.have.length(1);
  })

  it('should contain a Typography component with text "Réinitialisation du mot de passe"', () => {
    expect(divPassword.find(Typography)).to.have.length(1);
    expect(divPassword.find(Typography).text()).to.be.equal('Réinitialisation du mot de passe');
  })

  const passwordForm = divPassword.find('form.password-form');

  it('should contain a form tag witch className=password-form and have a onSubmit attribute', () => {
    expect(passwordForm).to.have.length(1);
    expect(passwordForm.props().hasOwnProperty('onSubmit')).to.be.true;
  })

  it('should contain a TextField component with className, id, label, name, and onChange attributes', () => {
    expect(passwordForm.find(TextField)).to.have.length(1);
    expect(passwordForm.find(TextField).props()).to.have.property('className', 'password-input');
    expect(passwordForm.find(TextField).props()).to.have.property('id', 'password-email');
    expect(passwordForm.find(TextField).props()).to.have.property('label', 'Adresse email du compte');
    expect(passwordForm.find(TextField).props()).to.have.property('name', 'passwordEmail');
    expect(passwordForm.props().hasOwnProperty('onChange')).to.be.true;
  })

  const passwordButton = passwordForm.find('div.password-button');

  it('should contain a div witch className="password-button"', () => {
    expect(passwordButton).to.have.length(1);
  })

  it('should contain a submit Button component with text "Réinitialiser le mot de passe"', () => {
    expect(passwordButton.find(Button)).to.have.length(1);
    expect(passwordButton.find(Button).props()).to.have.property('type', 'submit');
    expect(passwordButton.find(Button).text()).to.be.equal('Réinitialiser le mot de passe');
  })
})
