import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IngredientSearch from '../../components/ingredientSearch/IngredientSearch';

describe('<IngredientSearch />', () => {
  const ingredientSearch = shallow(<IngredientSearch />);

  it('should contain an IngredientSearchForm component', () => {
    expect(ingredientSearch.find('IngredientSearchForm')).to.have.length(1);
  })

  it('should contain a div witch className="ingredient-search-result"', () => {
    expect(ingredientSearch.find('div.ingredient-search-result')).to.have.length(1);
  })
})