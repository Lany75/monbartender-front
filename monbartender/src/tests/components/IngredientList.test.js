import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

import IngredientList from '../../components/ingredientList/IngredientList';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
const testListIngredients = [
  {
    id: "ad1d8a81-7ae6-4f5e-83a3-64889d390f8a",
    nom: "Eau Gazeuse",
    CategorieIngredient: {
      id: "52285198-dd1c-44d7-98b1-df2ef326e564",
      nom: "soft"
    }
  },
  {
    id: "b233195d-a090-4b96-a76d-f016c842c472",
    nom: "Jus De Citron Jaune",
    CategorieIngredient:
    {
      id: "57459a23-14dc-43e7-b730-932cee95b477",
      nom: "jus"
    }
  },
  {
    id: "740367a4-dedf-4093-86d1-50eac62b2521",
    nom: "Menthe",
    CategorieIngredient:
    {
      id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
      nom: "autre"
    }
  },
  {
    id: "bd799ef3-d7ae-4975-8be0-8f2397fa2b18",
    nom: "Rhum",
    CategorieIngredient:
    {
      id: "66ca7575-284f-41f9-b468-7535be3a3c18",
      nom: "alcool"
    }
  }
];
const testListCategories = [
  {
    id: "66ca7575-284f-41f9-b468-7535be3a3c18",
    nom: "ALCOOL"
  },
  {
    id: "f41e14e2-9bdd-47f4-95b4-1ff77022c630",
    nom: "AUTRE"
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
    id: "a9a4b3ee-1e53-44cc-a5bb-f6e48d361f6a",
    nom: "LEGUME"
  }
];

describe('<IngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    getBarUser: jest.fn(),
    listeIngredients: testListIngredients,
    setListeIngredients: jest.fn(),
    listeCategoriesIngredients: testListCategories
  }));

  const ingredientList = shallow(<IngredientList />);
  const divIngredientsList = ingredientList.find('div.igredients-list');

  it('should contain a div with className="igredients-list"', () => {
    expect(divIngredientsList).to.have.length(1);
  })

  it('should contain a DataGrid component with rows and columns attributes', () => {
    const dataGrid = divIngredientsList.find(DataGrid);
    expect(dataGrid).to.have.length(1);
    expect(dataGrid.props()).to.have.property('rows');
    expect(dataGrid.props()).to.have.property('columns');
  })

  const divDeleteIngredient = ingredientList.find('div.delete-ingredients');

  it('should contain a div with className="delete-ingredients"', () => {
    expect(divDeleteIngredient).to.have.length(1);
  })

  it('should contain a Button component with onClick attribute and text="Supprimer les ingrédients"', () => {
    const deleteButton = divDeleteIngredient.find(Button);

    expect(deleteButton).to.have.length(1);
    expect(deleteButton.props()).to.have.property('onClick');
    expect(deleteButton.text()).to.be.equal('Supprimer les ingrédients');
  })

  it('should contain a div with className="message"', () => {
    expect(divDeleteIngredient.find('div.message')).to.have.length(1);
  })

  const dialogs = ingredientList.find(Dialog);

  it('should contain 2 Dialog components with open and onClose attributes', () => {
    expect(dialogs).to.have.length(2);
    dialogs.forEach(d => {
      expect(d.props()).to.have.property('open');
      expect(d.props()).to.have.property('onClose');
    })
  })

  describe('first Dialog component (modify ingredient dialog)', () => {
    const modifyGlassDialog = dialogs.first();
    const dialogTitle = modifyGlassDialog.find(DialogTitle);

    it("should contain a DialogTitle component with id='form-dialog-title' and text='Modifier l\'ingrédient'", () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
      expect(dialogTitle.text()).to.be.equal("Modifier l'ingrédient");
    })

    const dialogContent = modifyGlassDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    it("should contain a DialogContentText component with text='Corrigez le nom et/ou la catégorie de l'ingrédient'", () => {
      expect(dialogContent.find(DialogContentText)).to.have.length(1);
      expect(dialogContent.find(DialogContentText).text()).to.be.equal("Corrigez le nom et/ou la catégorie de l'ingrédient");
    })

    it('should contain a TextField component with label, value and onChange attribute', () => {
      const textField = dialogContent.find(TextField);

      expect(textField).to.have.length(1);
      expect(textField.props()).to.have.property('label', "Nom de l'ingrédient");
      expect(textField.props()).to.have.property('value');
      expect(textField.props()).to.have.property('onChange');
    })

    const formControl = dialogContent.find(FormControl);

    it('should contain a FormControl component with id="form-control"', () => {
      expect(formControl).to.have.length(1);
      expect(formControl.props()).to.have.property('id', 'form-control');
    })

    it('should contain an InputLabel component with id="label-categorie" and text="Catégorie"', () => {
      expect(formControl.find(InputLabel)).to.have.length(1);
      expect(formControl.find(InputLabel).text()).to.be.equal('Catégorie');
    })

    const selectFormControl = formControl.find(Select);

    it('should contain a Select component with id="select-categorie"', () => {
      expect(selectFormControl).to.have.length(1);
      expect(selectFormControl.props()).to.have.property('id', 'select-categorie');
    })

    it('should contain 5 MenuItem component', () => {
      expect(selectFormControl.find(MenuItem)).to.have.length(5);
    })

    const dialogActions = modifyGlassDialog.find(DialogActions);

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

  describe('second Dialog component (delete ingredient dialog)', () => {
    const deleteGlassDialog = dialogs.last();
    const dialogTitle = deleteGlassDialog.find(DialogTitle);

    it('should contain a DialogTitle component with id="alert-dialog-title" and text="Confirmer la suppression des ingrédients"', () => {
      expect(dialogTitle).to.have.length(1);
      expect(dialogTitle.props()).to.have.property('id', 'alert-dialog-title');
      expect(dialogTitle.text()).to.be.equal('Confirmer la suppression des ingrédients');
    })

    const dialogContent = deleteGlassDialog.find(DialogContent);

    it('should contain a DialogContent component', () => {
      expect(dialogContent).to.have.length(1);
    })

    it('should contain a DialogContentText component with text="Etes vous sûr de vouloir supprimer ces ingrédients définitivement ?"', () => {
      expect(dialogContent.find(DialogContentText)).to.have.length(1);
      expect(dialogContent.find(DialogContentText).text()).to.be.equal('Etes vous sûr de vouloir supprimer ces ingrédients définitivement ?');
    })

    const dialogActions = deleteGlassDialog.find(DialogActions);

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