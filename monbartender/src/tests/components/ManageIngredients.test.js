import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageIngredients from '../../components/manageIngredients/ManageIngredients';
import IngredientList from '../../components/ingredientList/IngredientList';

describe('<ManagementPage />', () => {
  const manageIngredients = shallow(<ManageIngredients />);

  const divManageIngredients = manageIngredients.find('div.manage-ingredients');

  it('should contain a div witch className is manage-ingredients', () => {
    expect(divManageIngredients).to.have.length(1);
  })

  const divIngredients = divManageIngredients.find('div.ingredients');

  it('should contain a div witch className="ingredients"', () => {
    expect(divIngredients).to.have.length(1);
  })

  it('should contain an IngredientList component', () => {
    expect(divIngredients).to.contain(<IngredientList />);
  })

  it.skip('should contain an IngredientChange component', () => {
    expect(divIngredients).to.contain(<IngredientChange />);
  })

  it.skip('should contain an IngredientAdd component', () => {
    expect(divIngredients).to.contain(<IngredientAdd />);
  })

  const divCategorieIngredients = divManageIngredients.find('div.categories-ingredients');

  it('should contain a div witch className="categories-ingredients"', () => {
    expect(divCategorieIngredients).to.have.length(1);
  })

  it.skip('should contain an IngredientCategoryList component', () => {
    expect(divCategorieIngredients).to.contain(<IngredientCategoryList />);
  })

  it.skip('should contain an IngredientCategoryChange component', () => {
    expect(divCategorieIngredients).to.contain(<IngredientCategoryChange />);
  })

  it.skip('should contain an IngredientCategoryAdd component', () => {
    expect(divCategorieIngredients).to.contain(<IngredientCategoryAdd />);
  })
})