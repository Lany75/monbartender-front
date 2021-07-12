import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import CocktailRecipe from '../../components/cocktailRecipe/CocktailRecipe';

describe('<CocktailRecipe />', () => {
  const cocktailRecipe = shallow(
    <MemoryRouter>
      <CocktailRecipe />
    </MemoryRouter>);

  it('should contain a RecipePage component', () => {
    expect(cocktailRecipe).to.have.length(1);
  })
})