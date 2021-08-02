import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import GoogleButton from '../../components/googleButton/GoogleButton';

describe('<GoogleButton />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    signInWithGoogle: jest.fn()
  }));

  const googleButton = shallow(<GoogleButton>Texte du bouton</GoogleButton>);

  it('should contain a div witch className is connexion-google', () => {
    expect(googleButton.find('.connexion-google')).to.have.length(1);
  })

  it('should contain an img tag witch className is logo-google', () => {
    expect(googleButton.find('img')).to.have.length(1);
    expect(googleButton.find('img').props().className).to.equal('logo-google');
  })

  it('should contain the text "Texte du bouton"', () => {
    expect(googleButton.find('.connexion-google').text()).to.be.equal('Texte du bouton')
  })
})