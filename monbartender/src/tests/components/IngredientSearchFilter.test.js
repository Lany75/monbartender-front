import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import IngredientSearchFilter from '../../components/IngredientSearchFilter/IngredientSearchFilter';
import { Button } from '@material-ui/core';

const testCategory = {
  id: "57459a23-14dc-43e7-b730-932cee95b477",
  nom: "JUS"
}

describe('<IngredientSearchFilter />', () => {
  const realUseState = React.useState;
  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(true))

  const ingredientSearchFilter1 = shallow(
    <IngredientSearchFilter
      categorie={testCategory}
      setIsOpenFilter={jest.fn()}
      isClickedButton=''
      setIsClickedButton={jest.fn()}
    />)

  jest
    .spyOn(React, 'useState')
    .mockImplementationOnce(() => realUseState(false))

  const ingredientSearchFilter2 = shallow(
    <IngredientSearchFilter
      categorie={testCategory}
      setIsOpenFilter={jest.fn()}
      isClickedButton=''
      setIsClickedButton={jest.fn()}
    />)

  const filterButton1 = ingredientSearchFilter1.find('div.filter-button');
  const filterButton2 = ingredientSearchFilter2.find('div.filter-button');

  it('should contain a div witch className="filter-button"', () => {
    expect(filterButton1).to.have.length(1);
    expect(filterButton2).to.have.length(1);
  })

  const button1 = filterButton1.find(Button);
  const button2 = filterButton2.find(Button);

  it('should contain a Button component with variant and onClick attributes and text="JUS"', () => {
    expect(button1).to.have.length(1);
    expect(button1.props()).to.have.property('variant', 'outlined');
    expect(button1.props()).to.have.property('onClick');
    expect(button1.text()).to.be.equal('JUS');

    expect(button2).to.have.length(1);
    expect(button2.props()).to.have.property('variant', 'contained');
    expect(button2.props()).to.have.property('onClick');
    expect(button2.text()).to.be.equal('JUS');
  })
})
