import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AppliTitre from '../../components/appliTitre/AppliTitre';

describe('<AppliTitre />', () => {

  const appliTitre = shallow(<AppliTitre />);
  const titre = appliTitre.find('.appli-titre');

  it('should contain a div witch className is appli-titre', () => {
    expect(titre).to.have.length(1);
  })

  it('should have title "Mon Bartender"', () => {
    expect(titre.text()).to.be.equal('Mon BarTender');
  })
})