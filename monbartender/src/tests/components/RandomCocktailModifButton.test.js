import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';

import RandomCocktailModifButton from '../../components/randomCocktailModifButton/RandomCocktailModifButton';

describe('<RandomCocktailModifButton />', () => {
  const randomCocktailModifButton = shallow(<RandomCocktailModifButton otherCocktail={jest.fn()} />);

  it('should contain a div witch className is random-cocktail-modif-button', () => {
    expect(randomCocktailModifButton.find('.random-cocktail-modif-button')).to.have.length(1);
  })

  it('should contain a Button component', () => {
    const div = randomCocktailModifButton.find('.random-cocktail-modif-button');
    expect(div.find(Button)).to.have.length(1);
  })

  it('should contain the text "Un autre !!"', () => {
    const button = randomCocktailModifButton.find(Button);
    expect(button.text()).to.be.equal('Un autre !!');
  })

  it('should contain an onClick function', () => {
    const button = randomCocktailModifButton.find(Button);
    expect(typeof (button.props().onClick)).to.equal('function');
  })
})