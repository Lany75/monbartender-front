import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import NameSearchForm from '../../components/nameSearchForm/NameSearchForm';

const setCocktailName = jest.fn();
const setSearchCocktails = jest.fn();

describe('<NameSearchForm />', () => {
  const nameSearchForm = shallow(<NameSearchForm setCocktailName={setCocktailName} setSearchCocktails={setSearchCocktails} />)
  const formTag = nameSearchForm.find('form.search-form');

  it('should contain a form witch className is search-form', () => {
    expect(formTag).to.have.length(1);
  })

  it('should contain a TextField component witch have label, onChange and value attributes', () => {
    const textField = formTag.find(TextField);
    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('label', 'Nom du cocktail');
    expect(textField.props()).to.have.property('onChange');
    expect(textField.props()).to.have.property('value');
  })

  it('should contain a submit Button with text "Chercher"', () => {
    const button = formTag.find(Button);
    expect(button).to.have.length(1);
    expect(button.props()).to.have.property('type', 'submit');
    expect(button.text()).to.be.equal('Chercher');
  })
})