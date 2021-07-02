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

  describe('it test case with an undefined ingredient props', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      accessToken: testAccessToken,
      listeCategoriesIngredients: testListCategories,
      setListeIngredients: jest.fn()
    }));

    const ingredientChange = shallow(<IngredientChange />);
    const divIngredientChange = ingredientChange.find('div.ingredient-change');

    it('should contain a div witch className="ingredient-change"', () => {
      expect(divIngredientChange).to.have.length(1);
    })

    it("should contain a h4 tag witch text is 'MODIFICATION D'UN INGREDIENT'", () => {
      expect(divIngredientChange.find('h4')).to.have.length(1);
      expect(divIngredientChange.find('h4').text()).to.be.equal("MODIFICATION D'UN INGREDIENT");
    })

    const form = divIngredientChange.find('form.form-ingredient-change');

    it('should contain a form tag witch className="form-ingredient-change" and have onSubmit attribute', () => {
      expect(form).to.have.length(1);
      expect(form.props().hasOwnProperty('onSubmit')).to.be.true;
    })

    it('should contain a p tag witch id="ingredient-id" and with text "Cliquer dans le tableau sur l\'ingrédient à modifier ou à supprimer" if ingredient prop is undefined', () => {
      expect(form.find('p#ingredient-id')).to.have.length(1);
      expect(form.find('p#ingredient-id').text()).to.be.equal("Cliquer dans le tableau sur l'ingrédient à modifier ou à supprimer");
    })

    const divIngredientName = form.find('div#ingredient-name');

    it('should contain a div witch id="ingredient-name"', () => {
      expect(divIngredientName).to.have.length(1);
    })

    it('should contain a TextField component witch have name, label and onChange attributes', () => {
      const textField = divIngredientName.find(TextField);
      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'Nom');
      expect(textField.props()).to.have.property('name', 'ingredientName');
      expect(textField.props().hasOwnProperty('onChange')).to.be.true;
    })

    const divIngredientCategories = form.find('div#ingredient-categories');

    it('should contain a div witch id="ingredient-categories"', () => {
      expect(divIngredientCategories).to.have.length(1);
    })

    const formControl = divIngredientCategories.find(FormControl);

    it('should contain a FormControl component', () => {
      expect(formControl).to.have.length(1);
    })

    it('should contain an InputLabel component witch id="label-categorie" and text="Catégorie"', () => {
      expect(formControl.find(InputLabel)).to.have.length(1);
      expect(formControl.find(InputLabel).text()).to.be.equal('Catégorie');
    })

    const selectFormControl = formControl.find(Select);

    it('should contain a Select component witch id="select-categorie"', () => {
      expect(selectFormControl).to.have.length(1);
      expect(selectFormControl.props()).to.have.property('id', 'select-categorie');
    })

    it('should contain 5 MenuItem component', () => {
      expect(selectFormControl.find(MenuItem)).to.have.length(5);
    })

    const btnModify = form.find('div#ingredient-change-btn-modify');

    it('should contain a div witch id="ingredient-change-btn-modify"', () => {
      expect(btnModify).to.have.length(1);
    })

    it('should contain a submit Button with text="Modifier"', () => {
      expect(btnModify.find(Button)).to.have.length(1);
      expect(btnModify.find(Button).props()).to.have.property('type', 'submit');
      expect(btnModify.find(Button).text()).to.be.equal('Modifier');
    })

    const btnDelete = form.find('div#ingredient-change-btn-delete');

    it('should contain a div witch id="ingredient-change-btn-delete"', () => {
      expect(btnDelete).to.have.length(1);
    })

    it('should contain a Button with text="Supprimer"', () => {
      expect(btnDelete.find(Button)).to.have.length(1);
      expect(btnDelete.find(Button).props()).to.have.property('type', 'button');
      expect(btnDelete.find(Button).text()).to.be.equal('Supprimer');
    })
  })

  describe('it test case with a defined ingredient props', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      accessToken: testAccessToken,
      listeCategoriesIngredients: testListCategories,
      setListeIngredients: jest.fn()
    }));

    const ingredientChange = shallow(<IngredientChange ingredient={testSelectedIngredient} />);
    const divIngredientChange = ingredientChange.find('div.ingredient-change');

    it('should contain a div witch className="ingredient-change"', () => {
      expect(divIngredientChange).to.have.length(1);
    })

    it("should contain a h4 tag witch text is 'MODIFICATION D'UN INGREDIENT'", () => {
      expect(divIngredientChange.find('h4')).to.have.length(1);
      expect(divIngredientChange.find('h4').text()).to.be.equal("MODIFICATION D'UN INGREDIENT");
    })

    const form = divIngredientChange.find('form.form-ingredient-change');

    it('should contain a form tag witch className="form-ingredient-change" and have onSubmit attribute', () => {
      expect(form).to.have.length(1);
      expect(form.props().hasOwnProperty('onSubmit')).to.be.true;
    })

    it('should contain a p tag witch id="ingredient-id" and with text "id: c3fd98ec-cad4-49c9-9a74-63ca90489a0a" if ingredient prop is defined', () => {
      expect(form.find('p#ingredient-id')).to.have.length(1);
      expect(form.find('p#ingredient-id').text()).to.be.equal('id: c3fd98ec-cad4-49c9-9a74-63ca90489a0a');
    })

    const divIngredientName = form.find('div#ingredient-name');

    it('should contain a div witch id="ingredient-name"', () => {
      expect(divIngredientName).to.have.length(1);
    })

    it('should contain a TextField component witch have name, label and onChange attributes', () => {
      const textField = divIngredientName.find(TextField);
      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'Nom');
      expect(textField.props()).to.have.property('name', 'ingredientName');
      expect(textField.props().hasOwnProperty('onChange')).to.be.true;
    })

    const divIngredientCategories = form.find('div#ingredient-categories');

    it('should contain a div witch id="ingredient-categories"', () => {
      expect(divIngredientCategories).to.have.length(1);
    })

    const formControl = divIngredientCategories.find(FormControl);

    it('should contain a FormControl component', () => {
      expect(formControl).to.have.length(1);
    })

    it('should contain an InputLabel component witch id="label-categorie" and text="Catégorie"', () => {
      expect(formControl.find(InputLabel)).to.have.length(1);
      expect(formControl.find(InputLabel).text()).to.be.equal('Catégorie');
    })

    const selectFormControl = formControl.find(Select);

    it('should contain a Select component witch id="select-categorie"', () => {
      expect(selectFormControl).to.have.length(1);
      expect(selectFormControl.props()).to.have.property('id', 'select-categorie');
    })

    it('should contain 5 MenuItem component', () => {
      expect(selectFormControl.find(MenuItem)).to.have.length(5);
    })

    const btnModify = form.find('div#ingredient-change-btn-modify');

    it('should contain a div witch id="ingredient-change-btn-modify"', () => {
      expect(btnModify).to.have.length(1);
    })

    it('should contain a submit Button with text="Modifier"', () => {
      expect(btnModify.find(Button)).to.have.length(1);
      expect(btnModify.find(Button).props()).to.have.property('type', 'submit');
      expect(btnModify.find(Button).text()).to.be.equal('Modifier');
    })

    const btnDelete = form.find('div#ingredient-change-btn-delete');

    it('should contain a div witch id="ingredient-change-btn-delete"', () => {
      expect(btnDelete).to.have.length(1);
    })

    it('should contain a Button with text="Supprimer"', () => {
      expect(btnDelete.find(Button)).to.have.length(1);
      expect(btnDelete.find(Button).props()).to.have.property('type', 'button');
      expect(btnDelete.find(Button).text()).to.be.equal('Supprimer');
    })
  })

})