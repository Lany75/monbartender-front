import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import AppliTitre from '../../components/appliTitre/AppliTitre';

describe('<AppliTitre />', () => {

  const appliTitre = shallow(<AppliTitre />);
  const titre = appliTitre.find('.appli-titre');

  it('should contain a div witch className is appli-titre and text="Mon BarTender"', () => {
    expect(titre).to.have.length(1);
    expect(titre.text()).to.be.equal('Mon BarTender');
  })
})