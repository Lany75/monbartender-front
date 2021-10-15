import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';

import CocktailAddPhoto from '../../components/cocktailAddPhoto/CocktailAddPhoto';
import CocktailAddChosenImage from '../../components/cocktailAddChosenImage/CocktailAddChosenImage';

describe('<CocktailAddPhoto />', () => {
  const cocktailAddPhoto = shallow(<CocktailAddPhoto />);
  const divCocktailAddPhoto = cocktailAddPhoto.find('div.cocktail-add-img');

  it('should contain a div with className="cocktail-add-img"', () => {
    expect(divCocktailAddPhoto).to.have.length(1);
  })

  it('should contain a CocktailAddChosenImage component', () => {
    expect(divCocktailAddPhoto.find(CocktailAddChosenImage)).to.have.length(1);
  })

  const label = divCocktailAddPhoto.find('label.btn-choose-img');

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

  it('the first Button have text="Modifier"', () => {
    expect(buttons.first().text()).to.be.equal('Modifier');
  })

  it('the last Button have text="Supprimer" and onCLick attribute', () => {
    expect(buttons.last().text()).to.be.equal('Supprimer');
    expect(buttons.last().props()).to.have.property('onClick');
  })

})