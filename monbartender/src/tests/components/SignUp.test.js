import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SignUp from '../../components/signUp/SignUp';
import GoogleButton from '../../components/googleButton/GoogleButton';

describe('<SignUp />', () => {
  const signUp = shallow(<SignUp />);

  it('should contain a div witch className is inscription-message', () => {
    expect(signUp.find('.inscription-message')).to.have.length(1);
  })

  it('should contain a div witch className is inscription', () => {
    expect(signUp.find('.inscription')).to.have.length(1);
  })

  it('should contain a form witch className is signup-form', () => {
    const inscriptionDiv = signUp.find('.inscription');
    expect(inscriptionDiv.find('form')).to.have.length(1);
    expect(inscriptionDiv.find('form').props().className).to.equal('signup-form');
  })

  it('should contain 5 TextField components', () => {
    const signUpForm = signUp.find('form');
    const textFieldForm = signUpForm.find('.signup-input');
    expect(textFieldForm).to.have.length(5);
  })

  it('should contain a submit button', () => {
    const signUpForm = signUp.find('form');
    const signUpButton = signUpForm.find('.signup-button');
    expect(signUpButton).to.have.length(1);
  })

  it('should contain a link to signin page', () => {
    const signUpForm = signUp.find('form');
    const signinLink = signUpForm.find('.yes-account');
    expect(signinLink).to.have.length(1);
  })

  it('should contain a GoogleButton component', () => {
    expect(signUp).to.contain(<GoogleButton text='Inscription Google' />);
  })
})