import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@material-ui/core';

import SignUp from '../../components/signUp/SignUp';

describe('<SignUp />', () => {
  const signUp = shallow(<SignUp />);

  it('should contain a div witch className is inscription-message', () => {
    expect(signUp.find('div.inscription-message')).to.have.length(1);
  })

  const container = signUp.find(Container);

  it('should contain a Container component', () => {
    expect(container).to.have.length(1);
  })

  const divInscription = container.find('div.inscription')

  it('should contain a div witch className is inscription', () => {
    expect(divInscription).to.have.length(1);
  })

  it('should contain a div witch className is inscription', () => {
    expect(signUp.find('.inscription')).to.have.length(1);
  })

  it('should contain a Typography component witch text="Inscription"', () => {
    const typography = divInscription.find(Typography);
    expect(typography).to.have.length(1);
    expect(typography.text()).to.be.equal('Inscription');
  })

  const signupForm = divInscription.find('form.signup-form');

  it('should contain a form witch className is signup-form and have an onSubmit attribute', () => {
    expect(signupForm).to.have.length(1);
    expect(signupForm.props()).to.have.property('onSubmit');
  })

  const textFields = signupForm.find(TextField);

  it('should contain 5 TextField components witch className="signup-input"', () => {
    expect(textFields).to.have.length(5);
    textFields.map(tf => {
      expect(tf.props()).to.have.property('className', 'signup-input');
    })
  })

  const divSignunButton = signupForm.find('div.signup-button');

  it('should contain a div witch className="signup-button"', () => {
    expect(divSignunButton).to.have.length(1);
  })

  it('should contain a submit Button component with text="S\'inscrire"', () => {
    const submitButton = divSignunButton.find(Button);
    expect(submitButton).to.have.length(1);
    expect(submitButton.find(Button).props()).to.have.property('type', 'submit');
    expect(submitButton.find(Button).text()).to.be.equal("S'inscrire");
  })

  const yesAccount = signupForm.find('.yes-account');

  it('should contain a component with className="yes-account" and text="Déja un compte? Connexion"', () => {
    expect(yesAccount).to.have.length(1);
    expect(yesAccount.text()).to.be.equal('Déja un compte? Connexion');
  })

  it('should contain a link to signin page', () => {
    expect(yesAccount.find(Link)).to.have.length(1);
    expect(yesAccount.find(Link).props()).to.have.property('to', '/connexion');
    expect(yesAccount.find(Link).text()).to.be.equal('Connexion');
  })

  it('should contain a GoogleButton component', () => {
    expect(signUp.find('GoogleButton')).to.have.length(1);
  })
})