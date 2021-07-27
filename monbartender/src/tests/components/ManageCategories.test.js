import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageCategories from '../../components/manageCategories/ManageCategories';
import IngredientCategoryAdd from '../../components/ingredientCategoryAdd/IngredientCategoryAdd';

describe('<ManageCategories />', () => {
  const manageCategories = shallow(<ManageCategories />);
  const divManageCategories = manageCategories.find('div.manage-categories');

  it('should contain a div witch className is manage-categories', () => {
    expect(divManageCategories).to.have.length(1);
  })

  it('should contain a h4 tag witch text="LES CATEGORIES D\'INGREDIENTS"', () => {
    expect(divManageCategories.find('h4')).to.have.length(1);
    expect(divManageCategories.find('h4').text()).to.be.equal("LES CATEGORIES D'INGREDIENTS");
  })

  it('should contain an IngredientCategoryList component', () => {
    expect(divManageCategories.find('IngredientCategoryList')).to.have.length(1);
  })

  it('should contain an IngredientCategoryChange component', () => {
    expect(divManageCategories.find('IngredientCategoryChange')).to.have.length(1);
  })

  it('should contain an IngredientCategoryAdd component', () => {
    expect(divManageCategories).to.contain(<IngredientCategoryAdd />);
  })
})