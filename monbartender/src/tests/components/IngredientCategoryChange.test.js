import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import IngredientCategoryChange from '../../components/ingredientCategoryChange/IngredientCategoryChange';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
const testSelectedCategory = {
  id: "57459a23-14dc-43e7-b730-932cee95b477",
  nom: "JUS"
}

describe('<IngredientCategoryChange />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  describe('it test case with an undefined category props', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      accessToken: testAccessToken,
      setListeCategoriesIngredients: jest.fn(),
      getListeIngredients: jest.fn(),
    }));

    const ingredientCategoryChange = shallow(<IngredientCategoryChange />);
    const divIngredientCategoryChange = ingredientCategoryChange.find('div.ingredient-category-change');

    it('should contain a div witch className="ingredient-category-change"', () => {
      expect(divIngredientCategoryChange).to.have.length(1);
    })

    it("should contain a h4 tag witch text is 'MODIFICATION D'UNE CATEGORIE D'INGREDIENT'", () => {
      expect(divIngredientCategoryChange.find('h4')).to.have.length(1);
      expect(divIngredientCategoryChange.find('h4').text()).to.be.equal("MODIFICATION D'UNE CATEGORIE D'INGREDIENT");
    })

    const form = divIngredientCategoryChange.find('form.form-category-change');

    it('should contain a form tag witch className="form-category-change" and have onSubmit attribute', () => {
      expect(form).to.have.length(1);
      expect(form.props().hasOwnProperty('onSubmit')).to.be.true;
    })

    it('should contain a p tag witch id="category-id" and with text "Cliquer dans le tableau sur la catégorie à modifier" if ingredient prop is undefined', () => {
      expect(form.find('p#category-id')).to.have.length(1);
      expect(form.find('p#category-id').text()).to.be.equal("Cliquer dans le tableau sur la catégorie à modifier");
    })

    const divCategoryName = form.find('div#category-name');

    it('should contain a div witch id="category-name"', () => {
      expect(divCategoryName).to.have.length(1);
    })

    it('should contain a TextField component witch have name, label and onChange attributes', () => {
      const textField = divCategoryName.find(TextField);
      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'Nom');
      expect(textField.props()).to.have.property('name', 'categoryName');
      expect(textField.props().hasOwnProperty('onChange')).to.be.true;
    })

    const btnModify = form.find('div#category-change-btn-modify');

    it('should contain a div witch id="category-change-btn-modify"', () => {
      expect(btnModify).to.have.length(1);
    })

    it('should contain a submit Button with text="Modifier"', () => {
      expect(btnModify.find(Button)).to.have.length(1);
      expect(btnModify.find(Button).props()).to.have.property('type', 'submit');
      expect(btnModify.find(Button).text()).to.be.equal('Modifier');
    })
  })

  describe('it test case with a defined category props', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      accessToken: testAccessToken,
      setListeCategoriesIngredients: jest.fn(),
      getListeIngredients: jest.fn(),
    }));

    const ingredientCategoryChange = shallow(<IngredientCategoryChange category={testSelectedCategory} />);
    const divIngredientCategoryChange = ingredientCategoryChange.find('div.ingredient-category-change');

    it('should contain a div witch className="ingredient-category-change"', () => {
      expect(divIngredientCategoryChange).to.have.length(1);
    })

    it("should contain a h4 tag witch text is 'MODIFICATION D'UNE CATEGORIE D'INGREDIENT'", () => {
      expect(divIngredientCategoryChange.find('h4')).to.have.length(1);
      expect(divIngredientCategoryChange.find('h4').text()).to.be.equal("MODIFICATION D'UNE CATEGORIE D'INGREDIENT");
    })

    const form = divIngredientCategoryChange.find('form.form-category-change');

    it('should contain a form tag witch className="form-category-change" and have onSubmit attribute', () => {
      expect(form).to.have.length(1);
      expect(form.props().hasOwnProperty('onSubmit')).to.be.true;
    })

    it('should contain a p tag witch id="category-id" and with text "id: 57459a23-14dc-43e7-b730-932cee95b477" if category prop is defined', () => {
      expect(form.find('p#category-id')).to.have.length(1);
      expect(form.find('p#category-id').text()).to.be.equal('id: 57459a23-14dc-43e7-b730-932cee95b477');
    })

    const divCategoryName = form.find('div#category-name');

    it('should contain a div witch id="category-name"', () => {
      expect(divCategoryName).to.have.length(1);
    })

    it('should contain a TextField component witch have name, label and onChange attributes', () => {
      const textField = divCategoryName.find(TextField);
      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'Nom');
      expect(textField.props()).to.have.property('name', 'categoryName');
      expect(textField.props().hasOwnProperty('onChange')).to.be.true;
    })

    const btnModify = form.find('div#category-change-btn-modify');

    it('should contain a div witch id="category-change-btn-modify"', () => {
      expect(btnModify).to.have.length(1);
    })

    it('should contain a submit Button with text="Modifier"', () => {
      expect(btnModify.find(Button)).to.have.length(1);
      expect(btnModify.find(Button).props()).to.have.property('type', 'submit');
      expect(btnModify.find(Button).text()).to.be.equal('Modifier');
    })
  })
})