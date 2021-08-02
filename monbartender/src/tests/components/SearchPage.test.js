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
    expect(paperTabs.props()).to.have.property('onChange');
  })

  it('should contain 3 Tab components witch id is search-tab-label', () => {
    expect(paperTabs.find(Tab)).to.have.length(3);
    paperTabs.find(Tab).map(pt => {
      expect(pt.props()).to.have.property('id', 'search-tab-label');
    })
  })

  const tabPanelComponents = searchPage.find('TabPanel')

  it('should contain 3 TabPanel components', () => {
    expect(tabPanelComponents).to.have.length(3);
  })

  it('the first TabPanel component should have id="tp-ingredient-search" and contain an IngredientSearch component', () => {
    expect(tabPanelComponents.get(0).props.id).to.be.equal('tp-ingredient-search');
    const tp = searchPage.find('#tp-ingredient-search');
    expect(tp.find('IngredientSearch')).to.have.length(1);
  })

  it('the second TabPanel component should have id="tp-name-search" and contain a NameSearch component', () => {
    expect(tabPanelComponents.get(1).props.id).to.be.equal('tp-name-search');
    const tp = searchPage.find('#tp-name-search');
    expect(tp.find('NameSearch')).to.have.length(1);
  })

  it('the third TabPanel component should have id="tp-random-cocktail" and contain a RandomCocktail component', () => {
    expect(tabPanelComponents.get(2).props.id).to.be.equal('tp-random-cocktail');
    const tp = searchPage.find('#tp-random-cocktail');
    expect(tp.find('RandomCocktail')).to.have.length(1);
  })
})