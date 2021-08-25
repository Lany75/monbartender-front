import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@material-ui/core";

import UserBarIngredientList from '../../components/userBarIngredientList/UserBarIngredientList';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';

const userBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: false,
  Ingredients: [
    {
      id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
      nom: "Eau Gazeuse",
      CategorieIngredient: {
        id: "52285198-dd1c-44d7-98b1-df2ef326e564",
        nom: "SOFT"
      }
    },
    {
      id: "740367a4-dedf-4093-86d1-50eac62b2521",
      nom: "Menthe",
      CategorieIngredient:
      {
        id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
        nom: "AUTRE"
      }
    }
  ]
};

describe('<UserBarIngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    bar: userBar,
    setBar: jest.fn(),
    accessToken: testAccessToken
  }));

  const userBarIngredientList = shallow(<UserBarIngredientList />);
  const ingredientsListTitle = userBarIngredientList.find('div.ingredients-list-title');

  it('should contain a div witch className="ingredients-list-title" and text="Mon Bar"', () => {
    expect(ingredientsListTitle).to.have.length(1);
    expect(ingredientsListTitle.text()).to.be.equal('Mon Bar');
  })

  const divIngredientList = userBarIngredientList.find('div.ingredients-list');

  it('should contain a div witch className="ingredients-list"', () => {
    expect(divIngredientList).to.have.length(1);
  })

  const dataGrid = divIngredientList.find(DataGrid);

  it('should contain 1 DataGrid component with rows ans columns attributes', () => {
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const divDeleteIngredientBar = userBarIngredientList.find('div.delete-ingredient-bar');

  it('should contain a div witch className="delete-ingredient-bar"', () => {
    expect(divDeleteIngredientBar).to.have.length(1);
  })

  const deleteButton = divDeleteIngredientBar.find(Button);

  it('should contain a Button component with onClick attribute and text="Supprimer les ingrédients"', () => {
    expect(deleteButton).to.have.length(1);
    expect(deleteButton.props()).to.have.property('onClick');
    expect(deleteButton.text()).to.be.equal('Supprimer les ingrédients');
  })

  it('should contain a div with className="message"', () => {
    expect(divDeleteIngredientBar.find('div.message')).to.have.length(1);
  })

  const dialog = userBarIngredientList.find(Dialog);

  it('should contain a Dialog component with open and onClose attributes', () => {
    expect(dialog).to.have.length(1);
    expect(dialog.props()).to.have.property('open');
    expect(dialog.props()).to.have.property('onClose');
  })

  const dialogTitle = dialog.find(DialogTitle);

  it('should contain a DialogTitle component with id="alert-dialog-title" and text="Confirmer la suppression des ingrédients"', () => {
    expect(dialogTitle).to.have.length(1);
    expect(dialogTitle.props()).to.have.property('id', 'alert-dialog-title');
    expect(dialogTitle.text()).to.be.equal('Confirmer la suppression des ingrédients');
  })

  const dialogContent = dialog.find(DialogContent);

  it('should contain a DialogContent component', () => {
    expect(dialogContent).to.have.length(1);
  })

  it('should contain a DialogContentText component with id="alert-dialog-description" and text="Etes vous sûr de vouloir supprimer ces ingrédients de votre bar ?"', () => {
    expect(dialogContent.find(DialogContentText)).to.have.length(1);
    expect(dialogContent.find(DialogContentText).props()).to.have.property('id', 'alert-dialog-description');
    expect(dialogContent.find(DialogContentText).text()).to.be.equal('Etes vous sûr de vouloir supprimer ces ingrédients de votre bar ?');
  })

  const dialogActions = dialog.find(DialogActions);

  it('should contain a DialogActions component', () => {
    expect(dialogActions).to.have.length(1);
  })

  it('should contain 2 Button components with onClick attribute', () => {
    const dialogAtionsButton = dialogActions.find(Button);
    expect(dialogAtionsButton).to.have.length(2);
    dialogAtionsButton.map(dab => {
      expect(dab.props()).to.have.property('onClick');
    })
  })
})