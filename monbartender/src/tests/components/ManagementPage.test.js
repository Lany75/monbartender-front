import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Tabs, Tab } from '@material-ui/core';

import ManagementPage from '../../components/managementPage/ManagementPage';
import UnauthorizedPage from '../../components/unauthorizedPage/UnauthorizedPage';

const user = {
  displayName: "Mélanie PARRY",
  email: "mlanie.parry@gmail.com"
};
const adminBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: true,
  Ingredients: [],
};
const userBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: false,
  Ingredients: [],
};

describe('<ManagementPage />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  describe('it tests case if user is admin', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      user: user,
      bar: adminBar
    }));

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
      expect(paperTabs.props()).to.have.property('onChange');
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

    it('the sixth Tab component should have label="Des Utilisateurs"', () => {
      expect(tabComponents.get(5).props.label).to.be.equal('Des Utilisateurs');
    })

    const tabPanelComponents = managementPage.find('TabPanel');

    it('should contain 6 TabPanel components', () => {
      expect(tabPanelComponents).to.have.length(6);
    })

    it('the first TabPanel component should have id="tp-manage-moment-cocktails" and contain a GestionCocktailMoment component', () => {
      expect(tabPanelComponents.get(0).props.id).to.be.equal('tp-manage-moment-cocktails');
      const tp = managementPage.find('#tp-manage-moment-cocktails');
      expect(tp.find('GestionCocktailMoment')).to.have.length(1);
    })

    it('the second TabPanel component should have id="tp-manage-cocktails" and contain a GestionCocktails component', () => {
      expect(tabPanelComponents.get(1).props.id).to.be.equal('tp-manage-cocktails');
      const tp = managementPage.find('#tp-manage-cocktails');
      expect(tp.find('GestionCocktails')).to.have.length(1);
    })

    it('the third TabPanel component should have id="tp-manage-ingredients" and contain a ManageIngredients component', () => {
      expect(tabPanelComponents.get(2).props.id).to.be.equal('tp-manage-ingredients');
      const tp = managementPage.find('#tp-manage-ingredients');
      expect(tp.find('ManageIngredients')).to.have.length(1);
    })

    it('the fourth TabPanel component should have id="tp-manage-categories" and contain a ManageCategories component', () => {
      expect(tabPanelComponents.get(3).props.id).to.be.equal('tp-manage-categories');
      const tp = managementPage.find('#tp-manage-categories');
      expect(tp.find('ManageCategories')).to.have.length(1);
    })

    it('the fifth TabPanel component should have id="tp-manage-glasses" and contain a ManageGlass component', () => {
      expect(tabPanelComponents.get(4).props.id).to.be.equal('tp-manage-glasses');
      const tp = managementPage.find('#tp-manage-glasses');
      expect(tp.find('ManageGlass')).to.have.length(1);
    })

    it('the sixth TabPanel component should have id="tp-manage-user" and contain a ManageUsers component', () => {
      expect(tabPanelComponents.get(5).props.id).to.be.equal('tp-manage-user');
      const tp = managementPage.find('#tp-manage-user');
      expect(tp.find('ManageUsers')).to.have.length(1);
    })
  })

  describe('it tests case if user is not admin', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      user: user,
      bar: userBar
    }));

    const managementPage = shallow(<ManagementPage />);

    it('should contain an UnauthorizedPage component', () => {
      expect(managementPage.find(UnauthorizedPage)).to.have.length(1);
    })
  })
})
