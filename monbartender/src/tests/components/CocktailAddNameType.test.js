import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { FormControlLabel, RadioGroup, TextField } from '@material-ui/core';

import CocktailAddNameType from '../../components/cocktailAddNameType/CocktailAddNameType';

describe('<CocktailAddNameType />', () => {
  const cocktailAddNameType = shallow(<CocktailAddNameType />);
  const divCocktailAddNameType = cocktailAddNameType.find('div.cocktail-name-type');

  it('should contain a div with className="cocktail-name-type"', () => {
    expect(divCocktailAddNameType).to.have.length(1);
  })

  it('should contain a TextField component with name, label and onChange attributes', () => {
    const textField = divCocktailAddNameType.find(TextField);
    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('label', 'Nom du cocktail');
    expect(textField.props()).to.have.property('name', 'cocktailName');
    expect(textField.props()).to.have.property('onChange');
  })

  const radioGroup = divCocktailAddNameType.find(RadioGroup);

  it('should contain a RadioGroup component with id="type-cocktail", name, value and onChange attributes', () => {
    expect(radioGroup).to.have.length(1);
    expect(radioGroup.props()).to.have.property('id', 'type-cocktail');
    expect(radioGroup.props()).to.have.property('name', 'alcool');
    expect(radioGroup.props()).to.have.property('value');
    expect(radioGroup.props()).to.have.property('onChange');
  })

  const formControl = radioGroup.find(FormControlLabel);

  it('should contain 2 FormControlLabel component', () => {
    expect(formControl).to.have.length(2);
  })
})