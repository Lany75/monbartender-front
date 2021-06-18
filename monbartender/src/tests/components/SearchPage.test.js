import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import SearchPage from '../../components/searchPage/SearchPage';

describe('<SearchPage />', () => {
  const searchPage = shallow(<SearchPage />);

  it('should contain a div witch className is search-title and text is "Recherche ..."', () => {
    const searchTitle = searchPage.find('.search-title');
    expect(searchTitle).to.have.length(1);
    expect(searchTitle.text()).to.be.equal('Recherche ...');
  })

  it('should contain a component witch className is paper', () => {
    expect(searchPage.find('.paper')).to.have.length(1);
  })

  it('should contain 3 components witch id is tab-label', () => {
    expect(searchPage.find('#tab-label')).to.have.length(3);
  })

  it('should contain 3 TabPanel components', () => {
    expect(searchPage.find('TabPanel')).to.have.length(3);
  })
})