import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import NameSearchForm from '../../components/nameSearchForm/NameSearchForm';
import DisplayError from '../../components/displayError/DisplayError';

describe('<NameSearchForm />', () => {
  const setCocktailName = jest.fn();
  const setSearchCocktails = jest.fn();

  describe('It tests normal case with defined setCocktailName and setSearchCocktails', () => {
    const nameSearchForm = shallow(<NameSearchForm setCocktailName={setCocktailName} setSearchCocktails={setSearchCocktails} />)
    const formTag = nameSearchForm.find('form.search-form');

    it('should contain a form witch className is search-form', () => {
      expect(formTag).to.have.length(1);
    })

    it('should contain a TextField component witch have label, onChange and value attributes', () => {
      expect(formTag.find(TextField)).to.have.length(1);
      expect(formTag.find(TextField).props().hasOwnProperty('label')).to.be.true;
      expect(formTag.find(TextField).props().hasOwnProperty('onChange')).to.be.true;
      expect(formTag.find(TextField).props().hasOwnProperty('value')).to.be.true;
    })

    it('should contain a submit Button with text "Chercher"', () => {
      expect(formTag.find(Button)).to.have.length(1);
      expect(formTag.find(Button).props()).to.have.property('type', 'submit');
      expect(formTag.find(Button).text()).to.be.equal('Chercher');
    })
  })

  describe('It tests case with undefined setCocktailName prop', () => {
    const nameSearchForm = shallow(<NameSearchForm setSearchCocktails={setSearchCocktails} />)

    it('should contain a DisplayError component if setCocktailName is not defined', () => {
      expect(nameSearchForm.find(DisplayError)).to.have.length(1);
    })
  })

  describe('It tests case with undefined setSearchCocktails prop', () => {
    const nameSearchForm = shallow(<NameSearchForm setCocktailName={setCocktailName} />)

    it('should contain a DisplayError component if setCocktailName is not defined', () => {
      expect(nameSearchForm.find(DisplayError)).to.have.length(1);
    })
  })
})