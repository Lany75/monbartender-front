import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';

import RandomCocktailModifButton from '../../components/randomCocktailModifButton/RandomCocktailModifButton';

describe('<RandomCocktailModifButton />', () => {
  const randomCocktailModifButton = shallow(<RandomCocktailModifButton otherCocktail={jest.fn()} />);
  const div = randomCocktailModifButton.find('div.random-cocktail-modif-button');

  it('should contain a div witch className is random-cocktail-modif-button', () => {
    expect(div).to.have.length(1);
  })

  const button = div.find(Button);

  it('should contain a Button component witch text="Un autre !!" and have an onClick function', () => {
    expect(button).to.have.length(1);
    expect(button.text()).to.be.equal('Un autre !!');
    expect(typeof (button.props().onClick)).to.equal('function');
  })
})