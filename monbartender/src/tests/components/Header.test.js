import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from '../../components/header/Header';
import MenuButton from '../../components/menuButton/MenuButton';
import AppliTitre from '../../components/appliTitre/AppliTitre';
import AuthButton from '../../components/authButton/AuthButton';

describe('<Header />', () => {

  const header = shallow(<Header />);

  it('should contain a div witch className is header', () => {
    expect(header.find('.header')).to.have.length(1);
  })

  it('should contain a MenuButton component', () => {
    expect(header).to.contain(<MenuButton />);
  })

  it('should contain an AppliTitre component', () => {
    expect(header).to.contain(<AppliTitre />);
  })

  it('should contain an AuthButton component', () => {
    expect(header).to.contain(<AuthButton />);
  })
})