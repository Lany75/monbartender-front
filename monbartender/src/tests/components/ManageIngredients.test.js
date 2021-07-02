import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageIngredients from '../../components/manageIngredients/ManageIngredients';
import IngredientAdd from '../../components/ingredientAdd/IngredientAdd';

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

  it('should contain a h4 tag witch text="LES INGREDIENTS"', () => {
    expect(divIngredients.find('h4')).to.have.length(1);
    expect(divIngredients.find('h4').text()).to.be.equal('LES INGREDIENTS');
  })

  it('should contain an IngredientList component', () => {
    expect(divIngredients.find('IngredientList')).to.have.length(1);
  })

  it('should contain an IngredientChange component', () => {
    expect(divIngredients.find('IngredientChange')).to.have.length(1);
  })

  it('should contain an IngredientAdd component', () => {
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