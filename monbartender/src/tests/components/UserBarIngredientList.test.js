import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';

import UserBarIngredientList from '../../components/userBarIngredientList/UserBarIngredientList';

const userBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: false,
  Ingredients: [
    {
      id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
      nom: "Eau Gazeuse",
      CategorieIngredient: {
        id: "52285198-dd1c-44d7-98b1-df2ef326e564",
        nom: "SOFT"
      }
    },
    {
      id: "740367a4-dedf-4093-86d1-50eac62b2521",
      nom: "Menthe",
      CategorieIngredient:
      {
        id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
        nom: "AUTRE"
      }
    }
  ]
};

describe('<UserBarIngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    bar: userBar,
  }));

  const userBarIngredientList = shallow(<UserBarIngredientList />);
  const ingredientsListTitle = userBarIngredientList.find('div.ingredients-list-title');

  it('should contain a div witch className="ingredients-list-title" and text="Mon Bar"', () => {
    expect(ingredientsListTitle).to.have.length(1);
    expect(ingredientsListTitle.text()).to.be.equal('Mon Bar');
  })

  const divIngredientList = userBarIngredientList.find('div.ingredients-list');

  it('should contain a div witch className="ingredients-list"', () => {
    expect(divIngredientList).to.have.length(1);
  })

  it('should contain 1 DataGrid component', () => {
    expect(divIngredientList.find(DataGrid)).to.have.length(1);
  })
})