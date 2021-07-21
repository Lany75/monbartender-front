import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import UnauthorizedPage from '../../components/unauthorizedPage/UnauthorizedPage';

describe('<UnauthorizedPage />', () => {
  const unauthorizedPage = shallow(<UnauthorizedPage />);
  const divUnauthorizedPage = unauthorizedPage.find('div.unauthorized-page');

  it('should contain a div witch className is unauthorized-page', () => {
    expect(divUnauthorizedPage).to.have.length(1);
  })

  it('should contain a h1 tag with text="ACCES NON AUTORISE"', () => {
    const h1Tag = divUnauthorizedPage.find('h1')
    expect(h1Tag).to.have.length(1);
    expect(h1Tag.text()).to.be.equal('ACCES NON AUTORISE');
  })

  it('should contain a p tag with text="Vous n\'avez pas les droits d\'administrateur"', () => {
    const pTag = divUnauthorizedPage.find('p')
    expect(pTag).to.have.length(1);
    expect(pTag.text()).to.be.equal("Vous n'avez pas les droits d'administrateur");
  })
})