import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';

import CocktailPhoto from '../../components/cocktailPhoto/CocktailPhoto';
import CocktailChosenImage from '../../components/cocktailChosenImage/CocktailChosenImage';

describe('<CocktailPhoto />', () => {
  const cocktailPhoto = shallow(<CocktailPhoto />);
  const divCocktailPhoto = cocktailPhoto.find('div.cocktail-photo');

  it('should contain a div with className="cocktail-photo"', () => {
    expect(divCocktailPhoto).to.have.length(1);
  })

  it('should contain a CocktailChosenImage component', () => {
    expect(divCocktailPhoto.find(CocktailChosenImage)).to.have.length(1);
  })

  const label = divCocktailPhoto.find('label.btn-choose-img');

  it('should contain a label tag with className="btn-choose-img"', () => {
    expect(label).to.have.length(1);
  })

  const input = label.find('input#contained-button-file');

  it('should contain an input tag with id="contained-button-file", type="file", accept="image/*" and onChange attribute', () => {
    expect(input).to.have.length(1);
    expect(input.props()).to.have.property('type', 'file');
    expect(input.props()).to.have.property('accept', 'image/*');
    expect(input.props()).to.have.property('onChange');
  })

  const buttons = label.find(Button);

  it('should contain 2 Button components', () => {
    expect(buttons).to.have.length(2);
  })

  it('the first Button have text="Modifier l\'image"', () => {
    expect(buttons.first().text()).to.be.equal('Modifier l\'image');
  })

  it('the last Button have text="Supprimer l\'image" and onCLick attribute', () => {
    expect(buttons.last().text()).to.be.equal('Supprimer l\'image');
    expect(buttons.last().props()).to.have.property('onClick');
  })

})