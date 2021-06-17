import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SignIn from '../../components/signIn/SignIn';
import GoogleButton from '../../components/googleButton/GoogleButton';

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
    expect(signIn.find('.connexion-message')).to.have.length(1);
  })

  it('should contain a div witch className is connexion', () => {
    expect(signIn.find('.connexion')).to.have.length(1);
  })

  it('should contain a form witch className is signin-form', () => {
    const connexionDiv = signIn.find('.connexion');
    expect(connexionDiv.find('form')).to.have.length(1);
    expect(connexionDiv.find('form').props().className).to.equal('signin-form');
  })

  it('should contain 2 TextField components', () => {
    const signInForm = signIn.find('form');
    const textFieldForm = signInForm.find('.signin-input');
    expect(textFieldForm).to.have.length(2);
  })

  it('should contain a submit button', () => {
    const signInForm = signIn.find('form');
    const signInButton = signInForm.find('.signin-button');
    expect(signInButton).to.have.length(1);
  })

  it('should contain a link for forgotten password', () => {
    const signInForm = signIn.find('form');
    const forgottenPass = signInForm.find('.forgot-pass');
    expect(forgottenPass).to.have.length(1);
  })

  it('should contain a link to signup page', () => {
    const signInForm = signIn.find('form');
    const signupLink = signInForm.find('.no-account');
    expect(signupLink).to.have.length(1);
  })

  it('should contain a GoogleButton component', () => {
    expect(signIn).to.contain(<GoogleButton text='Connexion Google' />);
  })
})