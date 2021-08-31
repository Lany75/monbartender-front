import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ManageIngredients from '../../components/manageIngredients/ManageIngredients';
import IngredientAdd from '../../components/ingredientAdd/IngredientAdd';

describe('<ManageIngredients />', () => {
  const manageIngredients = shallow(<ManageIngredients />);
  const divManageIngredients = manageIngredients.find('div.manage-ingredients');

  it('should contain a div witch className is manage-ingredients', () => {
    expect(divManageIngredients).to.have.length(1);
  })

  /*it('should contain a h4 tag witch text="LES INGREDIENTS"', () => {
    expect(divManageIngredients.find('h4')).to.have.length(1);
    expect(divManageIngredients.find('h4').text()).to.be.equal('LES INGREDIENTS');
  })*/

  it('should contain an IngredientList component', () => {
    expect(divManageIngredients.find('IngredientList')).to.have.length(1);
  })

  /*it('should contain an IngredientChange component', () => {
    expect(divManageIngredients.find('IngredientChange')).to.have.length(1);
  })*/

  /*it('should contain an IngredientAdd component', () => {
    expect(divManageIngredients).to.contain(<IngredientAdd />);
  })*/
})