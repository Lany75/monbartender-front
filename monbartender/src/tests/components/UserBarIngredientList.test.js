import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import UserBarIngredientList from '../../components/userBarIngredientList/UserBarIngredientList';

const testListCategories = [
  {
    id: "66ca7575-284f-41f9-b468-7535be3a3c18",
    nom: "alcool"
  },
  {
    id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
    nom: "autre"
  },
  {
    id: "64ba9cda-82b4-403f-8018-c954d3326fd9",
    nom: "fruit"
  },
  {
    id: "57459a23-14dc-43e7-b730-932cee95b477",
    nom: "jus"
  },
  {
    id: "a9a4b3ee-1e53-44cc-a5bb-f6e48d361f6a",
    nom: "legume"
  }
];

describe('<UserBarIngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  describe('it tests case if listeCategoriesIngredients is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeCategoriesIngredients: undefined,
    }));

    const userBarIngredientList = shallow(<UserBarIngredientList />);

    it('should contain a LoadingMessage component', () => {
      expect(userBarIngredientList.find('LoadingMessage')).to.have.length(1);
      expect(userBarIngredientList.find('div.ingredient-list')).to.have.length(0);
    })
  })

  describe('it tests case if listeCategoriesIngredients is defined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeCategoriesIngredients: testListCategories,
    }));

    const userBarIngredientList = shallow(<UserBarIngredientList />);
    const divIngredientsList = userBarIngredientList.find('div.ingredients-list');

    it('should contain a div witch className="ingredients-list"', () => {
      expect(userBarIngredientList.find('LoadingMessage')).to.have.length(0);
      expect(divIngredientsList).to.have.length(1);
    })

    const ingredientsListTitle = divIngredientsList.find('div.ingredients-list-title');

    it('should contain a div witch className="ingredients-list-title" and text="Mon Bar"', () => {
      expect(ingredientsListTitle).to.have.length(1);
      expect(ingredientsListTitle.text()).to.be.equal('Mon Bar');
    })

    it('should contain 5 BarCategory components', () => {
      expect(divIngredientsList.find('BarCategory')).to.have.length(5);
    })
  })
})