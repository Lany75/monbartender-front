import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import { Button, Container, TextField, Typography } from '@material-ui/core';

import SignIn from '../../components/signIn/SignIn';

describe('<SignIn />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    signInWithEmailAndPassword: jest.fn()
  }));

  const signIn = shallow(<SignIn />);

  it('should contain a div witch className is connexion-message', () => {
    expect(signIn.find('div.connexion-message')).to.have.length(1);
  })

  const container = signIn.find(Container);

  it('should contain a Container component', () => {
    expect(container).to.have.length(1);
  })

  const divConnexion = container.find('div.connexion')

  it('should contain a div witch className is connexion', () => {
    expect(divConnexion).to.have.length(1);
  })

  it('should contain a Typography component witch text="Connexion"', () => {
    const typography = divConnexion.find(Typography);
    expect(typography).to.have.length(1);
    expect(typography.text()).to.be.equal('Connexion');
  })

  const signinForm = divConnexion.find('form.signin-form');

  it('should contain a form witch className is signin-form and have an onSubmit attribute', () => {
    expect(signinForm).to.have.length(1);
    expect(signinForm.props()).to.have.property('onSubmit');
  })

  const textFields = signinForm.find(TextField);

  it('should contain 2 TextField components witch className="signin-input"', () => {
    expect(textFields).to.have.length(2);
    textFields.map(tf => {
      expect(tf.props()).to.have.property('className', 'signin-input');
    })
  })

  const divSigninButton = signinForm.find('div.signin-button');

  it('should contain a div witch className="signin-button"', () => {
    expect(divSigninButton).to.have.length(1);
  })

  it('should contain a submit Button component with text="Se connecter"', () => {
    const submitButton = divSigninButton.find(Button);
    expect(submitButton).to.have.length(1);
    expect(submitButton.find(Button).props()).to.have.property('type', 'submit');
    expect(submitButton.find(Button).text()).to.be.equal('Se connecter');
  })

  const forgotPass = signinForm.find('.forgot-pass');

  it('should contain a component with className="forgot-pass"', () => {
    expect(forgotPass).to.have.length(1);
  })

  it('should contain a link for forgotten password with text="Mot de passe oublié?"', () => {
    expect(forgotPass.find(Link)).to.have.length(1);
    expect(forgotPass.find(Link).props()).to.have.property('to', '/password-oublie');
    expect(forgotPass.find(Link).text()).to.be.equal('Mot de passe oublié?');
  })

  const noAccount = signinForm.find('.no-account');

  it('should contain a component with className="no-account" and text="Pas de compte? Inscription"', () => {
    expect(noAccount).to.have.length(1);
    expect(noAccount.text()).to.be.equal('Pas de compte? Inscription');
  })

  it('should contain a link to signup page', () => {
    expect(noAccount.find(Link)).to.have.length(1);
    expect(noAccount.find(Link).props()).to.have.property('to', '/inscription');
    expect(noAccount.find(Link).text()).to.be.equal('Inscription');
  })

  it('should contain a GoogleButton component', () => {
    expect(signIn.find('GoogleButton')).to.have.length(1);
  })
})