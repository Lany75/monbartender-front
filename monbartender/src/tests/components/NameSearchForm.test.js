import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import NameSearchForm from '../../components/nameSearchForm/NameSearchForm';

describe('<NameSearchForm />', () => {
  const setCocktailName = jest.fn();
  const setSearchCocktails = jest.fn();

  const nameSearchForm = shallow(<NameSearchForm setCocktailName={setCocktailName} setSearchCocktails={setSearchCocktails} />)
  const formTag = nameSearchForm.find('form');

  it('should contain a form witch className is search-form', () => {
    expect(formTag).to.have.length(1);
    expect(formTag.props().className).to.be.equal('search-form');
  })

  it('should contain a TextField component', () => {
    expect(formTag.find(TextField)).to.have.length(1);
  })

  it('should contain a Button component with text "Chercher"', () => {
    expect(formTag.find(Button)).to.have.length(1);
    expect(formTag.find(Button).text()).to.be.equal('Chercher');
  })
})