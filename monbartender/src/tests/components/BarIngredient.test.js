import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import BarIngredient from '../../components/barIngredient/BarIngredient';

const ingredientMock = {
  CategorieIngredient:
  {
    id: '52285198-dd1c-44d7-98b1-df2ef326e564',
    nom: 'SOFT'
  },
  id: 'ad1d8a81-7ae6-4f5e-83a3-64889d390f8a',
  nom: 'Eau Gazeuse'
};

describe('<BarIngredient />', () => {
  const barIngredient = shallow(<BarIngredient ingredient={ingredientMock} />);
  const divBarIngredient = barIngredient.find('div.bar-ingredient');

  it('should contain a div witch className="bar-ingredient"', () => {
    expect(divBarIngredient).to.have.length(1);
  })

  it('should contain a p tag witch className="ingredient-name" and text="Eau Gazeuse"', () => {
    const ingredientName = divBarIngredient.find('p.ingredient-name');
    expect(ingredientName).to.have.length(1);
    expect(ingredientName.text()).to.be.equal('Eau Gazeuse');
  })

  it('should contain 1 DeleteForeverIcon component', () => {
    expect(divBarIngredient.find(DeleteForeverIcon)).to.have.length(1);
  })
})