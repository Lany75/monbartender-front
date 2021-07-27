import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import IngredientChange from '../../components/ingredientChange/IngredientChange';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
const testListCategories = [
  {
    id: "66ca7575-284f-41f9-b468-7535be3a3c18",
    nom: "alcool"
  },
  {
    id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
    nom: "autre"
  },
  {
    id: "64ba9cda-82b4-403f-8018-c954d3326fd9",
    nom: "fruit"
  },
  {
    id: "57459a23-14dc-43e7-b730-932cee95b477",
    nom: "jus"
  },
  {
    id: "a9a4b3ee-1e53-44cc-a5bb-f6e48d361f6a",
    nom: "legume"
  }
];
const testSelectedIngredient = {
  id: "c3fd98ec-cad4-49c9-9a74-63ca90489a0a",
  nom: "Sucre",
  CategorieIngredient:
  {
    id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
    nom: "autre"
  }
}

describe('<IngredientChange />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    listeCategoriesIngredients: testListCategories,
    setListeIngredients: jest.fn(),
  }));

  const ingredientChange1 = shallow(<IngredientChange ingredient={testSelectedIngredient} />);

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    listeCategoriesIngredients: undefined,
    setListeIngredients: jest.fn(),
  }));

  const ingredientChange2 = shallow(<IngredientChange />);

  const divIngredientChange1 = ingredientChange1.find('div.ingredient-change');
  const divIngredientChange2 = ingredientChange2.find('div.ingredient-change');

  it('should contain a div witch className="ingredient-change"', () => {
    expect(divIngredientChange1).to.have.length(1);
    expect(divIngredientChange2).to.have.length(1);
  })

  it("should contain a h4 tag witch text is 'MODIFICATION D'UN INGREDIENT'", () => {
    expect(divIngredientChange1.find('h4')).to.have.length(1);
    expect(divIngredientChange1.find('h4').text()).to.be.equal("MODIFICATION D'UN INGREDIENT");

    expect(divIngredientChange2.find('h4')).to.have.length(1);
    expect(divIngredientChange2.find('h4').text()).to.be.equal("MODIFICATION D'UN INGREDIENT");
  })

  const form1 = divIngredientChange1.find('form.form-ingredient-change');
  const form2 = divIngredientChange2.find('form.form-ingredient-change');

  it('should contain a form tag witch className="form-ingredient-change" and have onSubmit attribute', () => {
    expect(form1).to.have.length(1);
    expect(typeof (form1.props().onSubmit)).to.equal('function');

    expect(form2).to.have.length(1);
    expect(typeof (form2.props().onSubmit)).to.equal('function');
  })

  it('should contain a p tag witch id="ingredient-id" and with text "Cliquer dans le tableau sur l\'ingrédient à modifier" if ingredient prop is undefined', () => {
    expect(form2.find('p#ingredient-id')).to.have.length(1);
    expect(form2.find('p#ingredient-id').text()).to.be.equal("Cliquer dans le tableau sur l'ingrédient à modifier");
  })

  it('should contain a p tag witch id="ingredient-id" and with text "id: c3fd98ec-cad4-49c9-9a74-63ca90489a0a" if ingredient prop is defined', () => {
    expect(form1.find('p#ingredient-id')).to.have.length(1);
    expect(form1.find('p#ingredient-id').text()).to.be.equal('id: c3fd98ec-cad4-49c9-9a74-63ca90489a0a');
  })

  const divIngredientName1 = form1.find('div#ingredient-name');
  const divIngredientName2 = form2.find('div#ingredient-name');

  it('should contain a div witch id="ingredient-name"', () => {
    expect(divIngredientName1).to.have.length(1);
    expect(divIngredientName2).to.have.length(1);
  })

  it('should contain a TextField component witch have name, label and onChange attributes', () => {
    const textField1 = divIngredientName1.find(TextField);
    expect(textField1).to.have.length(1);
    expect(textField1.props()).to.have.property('label', 'Nom');
    expect(textField1.props()).to.have.property('name', 'ingredientName');
    expect(typeof (textField1.props().onChange)).to.equal('function');

    const textField2 = divIngredientName2.find(TextField);
    expect(textField2).to.have.length(1);
    expect(textField2.props()).to.have.property('label', 'Nom');
    expect(textField2.props()).to.have.property('name', 'ingredientName');
    expect(typeof (textField2.props().onChange)).to.equal('function');
  })

  const divIngredientCategories1 = form1.find('div#ingredient-categories');
  const divIngredientCategories2 = form2.find('div#ingredient-categories');

  it('should contain a div witch id="ingredient-categories"', () => {
    expect(divIngredientCategories1).to.have.length(1);
    expect(divIngredientCategories2).to.have.length(1);
  })

  const formControl1 = divIngredientCategories1.find(FormControl);
  const formControl2 = divIngredientCategories2.find(FormControl);

  it('should contain a FormControl component', () => {
    expect(formControl1).to.have.length(1);
    expect(formControl2).to.have.length(1);
  })

  it('should contain an InputLabel component witch id="label-categorie" and text="Catégorie"', () => {
    expect(formControl1.find(InputLabel)).to.have.length(1);
    expect(formControl1.find(InputLabel).props()).to.have.property('id', 'label-categorie');
    expect(formControl1.find(InputLabel).text()).to.be.equal('Catégorie');

    expect(formControl2.find(InputLabel)).to.have.length(1);
    expect(formControl2.find(InputLabel).props()).to.have.property('id', 'label-categorie');
    expect(formControl2.find(InputLabel).text()).to.be.equal('Catégorie');
  })

  const selectFormControl1 = formControl1.find(Select);
  const selectFormControl2 = formControl2.find(Select);

  it('should contain a Select component witch id="select-categorie" and have onChange attribute', () => {
    expect(selectFormControl1).to.have.length(1);
    expect(selectFormControl1.props()).to.have.property('id', 'select-categorie');
    expect(typeof (selectFormControl1.props().onChange)).to.equal('function');

    expect(selectFormControl2).to.have.length(1);
    expect(selectFormControl2.props()).to.have.property('id', 'select-categorie');
    expect(typeof (selectFormControl2.props().onChange)).to.equal('function');
  })

  it('should contain 5 MenuItem component if listeCategoriesIngredients is defined', () => {
    expect(selectFormControl1.find(MenuItem)).to.have.length(5);
  })

  it('should contain 0 MenuItem component if listeCategoriesIngredients is undefined', () => {
    expect(selectFormControl2.find(MenuItem)).to.have.length(0);
  })

  const btnModify1 = form1.find('div#ingredient-change-btn-modify');
  const btnModify2 = form2.find('div#ingredient-change-btn-modify');

  it('should contain a div witch id="ingredient-change-btn-modify"', () => {
    expect(btnModify1).to.have.length(1);
    expect(btnModify2).to.have.length(1);
  })

  it('should contain a submit Button with text="Modifier"', () => {
    expect(btnModify1.find(Button)).to.have.length(1);
    expect(btnModify1.find(Button).props()).to.have.property('type', 'submit');
    expect(btnModify1.find(Button).text()).to.be.equal('Modifier');

    expect(btnModify2.find(Button)).to.have.length(1);
    expect(btnModify2.find(Button).props()).to.have.property('type', 'submit');
    expect(btnModify2.find(Button).text()).to.be.equal('Modifier');
  })
})