import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Tabs, Tab } from '@material-ui/core';

import ManagementPage from '../../components/managementPage/ManagementPage';
import GestionCocktailMoment from '../../components/gestionCocktailMoment/GestionCocktailMoment';
import GestionCocktails from '../../components/gestionCocktails/GestionCocktails';
import ManageIngredients from '../../components/manageIngredients/ManageIngredients';


describe('<ManagementPage />', () => {
  const managementPage = shallow(<ManagementPage />);

  it('should contain a div witch className is management-title and text is "Gestion ..."', () => {
    const managementTitle = managementPage.find('div.management-title');
    expect(managementTitle).to.have.length(1);
    expect(managementTitle.text()).to.be.equal('Gestion ...');
  })

  const paper = managementPage.find(Paper);

  it('should contain a Paper component witch className is paper', () => {
    expect(paper).to.have.length(1);
    expect(paper.props()).to.have.property('className', 'paper');
  })

  const paperTabs = paper.find(Tabs);

  it('should contain a Tabs component with onChange attribute', () => {
    expect(paperTabs).to.have.length(1);
    expect(paperTabs.props().hasOwnProperty('onChange')).to.be.true;
  })

  const tabComponents = paperTabs.find(Tab);

  it('should contain 6 Tab components witch id is management-tab-label', () => {
    expect(tabComponents).to.have.length(6);
    tabComponents.find(Tab).map(pt => {
      expect(pt.props()).to.have.property('id', 'management-tab-label');
    })
  })

  it('the first Tab component should have label="Des Cocktails du Moment"', () => {
    expect(tabComponents.get(0).props.label).to.be.equal('Des Cocktails du Moment');
  })

  it('the second Tab component should have label="Des Cocktails"', () => {
    expect(tabComponents.get(1).props.label).to.be.equal('Des Cocktails');
  })

  it('the third Tab component should have label="Des Ingrédients"', () => {
    expect(tabComponents.get(2).props.label).to.be.equal('Des Ingrédients');
  })

  it('the fourth Tab component should have label="Des Catégories d\'Ingrédients"', () => {
    expect(tabComponents.get(3).props.label).to.be.equal("Des Catégories d'Ingrédients");
  })

  it('the fifth Tab component should have label="Des Verres"', () => {
    expect(tabComponents.get(4).props.label).to.be.equal('Des Verres');
  })

  it('the sixth Tab component should have label="Des Admin"', () => {
    expect(tabComponents.get(5).props.label).to.be.equal('Des Admin');
  })

  const tabPanelComponents = managementPage.find('TabPanel');

  it('should contain 6 TabPanel components', () => {
    expect(tabPanelComponents).to.have.length(6);
  })

  it.skip('the first TabPanel component should contain a GestionCocktailMoment component', () => {
    expect(tabPanelComponents).to.contain(<GestionCocktailMoment />);
  })

  it.skip('the second TabPanel component should contain a GestionCocktails component', () => {
    expect(tabPanelComponents).to.contain(<GestionCocktails />);
  })

  it.skip('the third TabPanel component should contain a ManageIngredients component', () => {
    expect(tabPanelComponents).to.contain(<ManageIngredients />);
  })

  it.skip('the fourth TabPanel component should contain a ManageCategories component', () => {
    expect(tabPanelComponents).to.contain(<ManageCategories />);
  })

  it.skip('the fifth TabPanel component should contain a GestionVerres component', () => {
    expect(tabPanelComponents).to.contain(<GestionVerres />);
  })

  it.skip('the sixth TabPanel component should contain a GestionAdmin component', () => {
    expect(tabPanelComponents).to.contain(<GestionAdmin />);
  })
})
