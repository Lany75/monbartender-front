import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageCategories from '../../components/manageCategories/ManageCategories';

describe('<ManageCategories />', () => {
  const manageCategories = shallow(<ManageCategories />);
  const divManageCategories = manageCategories.find('div.manage-categories');

  it('should contain a div with className="manage-categories"', () => {
    expect(divManageCategories).to.have.length(1);
  })

  it('should contain an IngredientCategoryAdd component', () => {
    expect(divManageCategories.find('IngredientCategoryAdd')).to.have.length(1);
  })

  it('should contain an IngredientCategoryList component', () => {
    expect(divManageCategories.find('IngredientCategoryList')).to.have.length(1);
  })
})