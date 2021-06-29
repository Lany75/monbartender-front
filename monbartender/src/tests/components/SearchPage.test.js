import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Tabs, Tab } from '@material-ui/core';

import SearchPage from '../../components/searchPage/SearchPage';

describe('<SearchPage />', () => {
  const searchPage = shallow(<SearchPage />);

  it('should contain a div witch className is search-title and text is "Recherche ..."', () => {
    const searchTitle = searchPage.find('.search-title');
    expect(searchTitle).to.have.length(1);
    expect(searchTitle.text()).to.be.equal('Recherche ...');
  })

  const paper = searchPage.find(Paper);

  it('should contain a Paper component witch className is paper', () => {
    expect(paper).to.have.length(1);
    expect(paper.props()).to.have.property('className', 'paper');
  })

  const paperTabs = paper.find(Tabs);

  it('should contain a Tabs component with onChange attribute', () => {
    expect(paperTabs).to.have.length(1);
    expect(paperTabs.props().hasOwnProperty('onChange')).to.be.true;
  })

  it('should contain 3 Tab components witch id is search-tab-label', () => {
    expect(paperTabs.find(Tab)).to.have.length(3);
    paperTabs.find(Tab).map(pt => {
      expect(pt.props()).to.have.property('id', 'search-tab-label');
    })
  })

  it('should contain 3 SearchTabPanel components', () => {
    expect(searchPage.find('SearchTabPanel')).to.have.length(3);
  })
})