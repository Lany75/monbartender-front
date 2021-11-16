import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageIngredients from '../../components/manageIngredients/ManageIngredients';

describe('<ManageIngredients />', () => {
  const manageIngredients = shallow(<ManageIngredients />);
  const divManageIngredients = manageIngredients.find('div.manage-ingredients');

  it('should contain a div witch className is manage-ingredients', () => {
    expect(divManageIngredients).to.have.length(1);
  })
  it('should contain a h4 tag with text="LES INGREDIENTS"', () => {
    expect(divManageIngredients.find('h4')).to.have.length(1);
    expect(divManageIngredients.find('h4').text()).to.be.equal('LES INGREDIENTS');
  })

  it('should contain an IngredientAdd component', () => {
    expect(divManageIngredients.find('IngredientAdd')).to.have.length(1);
  })

  it('should contain an IngredientList component', () => {
    expect(divManageIngredients.find('IngredientList')).to.have.length(1);
  })
})