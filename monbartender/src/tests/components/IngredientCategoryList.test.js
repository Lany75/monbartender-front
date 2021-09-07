import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";

import IngredientCategoryList from '../../components/ingredientCategoryList/IngredientCategoryList';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
const testListCategoriesIngredients = [
  {
    id: "66ca7575-284f-41f9-b468-7535be3a3c18",
    nom: "ALCOOL"
  },
  {
    id: "64ba9cda-82b4-403f-8018-c954d3326fd9",
    nom: "FRUIT"
  },
  {
    id: "57459a23-14dc-43e7-b730-932cee95b477",
    nom: "JUS"
  },
  {
    id: "8e6d7f82-95f6-40d4-ac30-9462a157b66e",
    nom: "LIQUEUR"
  },
  {
    id: "69ee0fd7-1489-4873-b036-dfeb9744d2e2",
    nom: "SIROP"
  }
]

describe('<IngredientCategoryList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    listeCategoriesIngredients: testListCategoriesIngredients,
    setListeCategoriesIngredients: jest.fn()
  }));

  const categoriesList = shallow(<IngredientCategoryList />);

  it("should contain a h4 tag with text='LES CATEGORIES D'INGREDIENTS'", () => {
    expect(categoriesList.find('h4')).to.have.length(1);
    expect(categoriesList.find('h4').text()).to.be.equal("LES CATEGORIES D'INGREDIENTS");
  })

  const divCategoriesList = categoriesList.find('div.categories-list');

  it('should contain a div with className="categories-list"', () => {
    expect(divCategoriesList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = divCategoriesList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const divDeleteCategory = categoriesList.find('div.delete-category');

  it('should contain a div with className="delete-category"', () => {
    expect(divDeleteCategory).to.have.length(1);
  })

  it('should contain a Button component with onClick attribute and text="Supprimer les catégories"', () => {
    const deleteButton = divDeleteCategory.find(Button);

    expect(deleteButton).to.have.length(1);
    expect(deleteButton.props()).to.have.property('onClick');
    expect(deleteButton.text()).to.be.equal('Supprimer les catégories');
  })

  it('should contain a div with className="message"', () => {
    expect(divDeleteCategory.find('div.message')).to.have.length(1);
  })

  const dialogs = categoriesList.find(Dialog);

  it('should contain 2 Dialog components with open and onClose attributes', () => {
    expect(dialogs).to.have.length(2);
    dialogs.forEach(d => {
      expect(d.props()).to.have.property('open');
      expect(d.props()).to.have.property('onClose');
    })
  })

  describe('first Dialog component (modify category dialog)', () => {
    const modifyCategoryDialog = dialogs.first();
    const dialogTitle = modifyCategoryDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="form-dialog-title" and text="Modifier la catégorie"', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Modifier la catégorie');
    })

    const dialogContent = modifyCategoryDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    it('should contain a DialogContentText component with text="Corrigez le nom de la catégorie"', () => {
      expect(dialogContent.find(DialogContentText)).to.have.length(1);
      expect(dialogContent.find(DialogContentText).text()).to.be.equal('Corrigez le nom de la catégorie');
    })

    it('should contain a TextField component with label, value and onChange attribute', () => {
      const textField = dialogContent.find(TextField);

      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', 'Nom de la catégorie');
      expect(textField.props()).to.have.property('value');
      expect(textField.props()).to.have.property('onChange');
    })

    const dialogActions = modifyCategoryDialog.find(DialogActions);

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

  describe('second Dialog component (delete category dialog)', () => {
    const deleteCategoryDialog = dialogs.last();
    const dialogTitle = deleteCategoryDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="alert-dialog-title" and text="Confirmer la suppression des catégories"', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'alert-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Confirmer la suppression des catégories');
    })

    const dialogContent = deleteCategoryDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    it('should contain a DialogContentText component with text="Etes vous sûr de vouloir supprimer ces catégories définitivement ?"', () => {
      expect(dialogContent.find(DialogContentText)).to.have.length(1);
      expect(dialogContent.find(DialogContentText).text()).to.be.equal('Etes vous sûr de vouloir supprimer ces catégories définitivement ?');
    })

    const dialogActions = deleteCategoryDialog.find(DialogActions);

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
})