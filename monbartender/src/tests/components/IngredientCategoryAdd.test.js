import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';

import IngredientCategoryAdd from '../../components/ingredientCategoryAdd/IngredientCategoryAdd';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';

describe('<IngredientCategoryAdd />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    setListeCategoriesIngredients: jest.fn()
  }));

  const ingredientCategoryAdd = shallow(<IngredientCategoryAdd />);
  const formCategoryAdd = ingredientCategoryAdd.find('form.form-ingredient-category-add');

  it('should contain a form tag with className="form-ingredient-category-add" and onSubmit attribute', () => {
    expect(formCategoryAdd).to.have.length(1);
    expect(formCategoryAdd.props()).to.have.property('onSubmit');
  })

  const divIngredientCategoryAddName = formCategoryAdd.find('div#ingredient-category-add-name');

  it('should contain a div witch id="ingredient-category-add-name"', () => {
    expect(divIngredientCategoryAddName).to.have.length(1);
  })

  it('should contain a TextField component witch have name, label and onChange attributes', () => {
    const textField = divIngredientCategoryAddName.find(TextField);
    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('label', 'Nouvelle catégorie');
    expect(textField.props()).to.have.property('name', 'ingredientCategoryName');
    expect(textField.props()).to.have.property('onChange');
  })

  const btnAdd = formCategoryAdd.find('div#ingredient-category-add-btn');

  it('should contain a div witch id="ingredient-category-add-btn"', () => {
    expect(btnAdd).to.have.length(1);
  })

  it('should contain a submit Button with text="+"', () => {
    expect(btnAdd.find(Button)).to.have.length(1);
    expect(btnAdd.find(Button).props()).to.have.property('type', 'submit');
    expect(btnAdd.find(Button).text()).to.be.equal('+');
  })
})