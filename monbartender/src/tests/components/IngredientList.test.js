import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import IngredientList from '../../components/ingredientList/IngredientList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

//const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
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
//const setIngredientClickedMock = jest.fn();

describe('<IngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  /*describe('it tests case if listeIngredients is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      accessToken: testAccessToken,
      listeIngredients: testListIngredients,
      setListeIngredients: jest.fn(),
      getBarUser: jest.fn()
    }));

    const ingredientList = shallow(<IngredientList setIngredientClicked={setIngredientClickedMock} />);

    it('should contain a LoadingMessage component', () => {
      expect(ingredientList.find(LoadingMessage)).to.have.length(1);
    })
  })*/

  //describe('it tests case if listeIngredients is defined', () => {
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    //accessToken: testAccessToken,
    listeIngredients: testListIngredients,
    //setListeIngredients: jest.fn(),
    //getBarUser: jest.fn()
  }));

  const ingredientList = shallow(<IngredientList /*setIngredientClicked={setIngredientClickedMock} */ />);

  it('should contain a h4 tag with text="LES INGREDIENTS"', () => {
    expect(ingredientList.find('h4')).to.have.length(1);
    expect(ingredientList.find('h4').text()).to.be.equal('LES INGREDIENTS');
  })

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

  it('should contain 1 Dialog components with open and onClose attributes', () => {
    expect(dialogs).to.have.length(1);
    expect(dialogs.props()).to.have.property('open');
    expect(dialogs.props()).to.have.property('onClose');

    /*dialogs.forEach(d => {
      expect(d.props()).to.have.property('open');
      expect(d.props()).to.have.property('onClose');
    })*/
  })

  describe('first Dialog component (delete ingredient dialog)', () => {
    const deleteGlassDialog = dialogs.first();
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

  /*const paper = ingredientList.find(Paper);

  
  it('should contain a Paper component witch className="paper"', () => {
    expect(paper).to.have.length(1);
    expect(paper.props()).to.have.property('className', 'paper');
  })

  const tableContainer = paper.find(TableContainer);

  it('should contain a TableContainer component witch className=table-container', () => {
    expect(tableContainer).to.have.length(1);
    expect(tableContainer.props()).to.have.property('className', 'table-container');
  })

  const table = tableContainer.find(Table);

  it('should contain a Table component', () => {
    expect(table).to.have.length(1);
  })

  const tableHead = table.find(TableHead);

  it('should contain a TableHead component', () => {
    expect(tableHead).to.have.length(1);
  })

  const tableRow = tableHead.find(TableRow);

  it('should contain a TableRow component', () => {
    expect(tableRow).to.have.length(1);
  })

  it('should contain 4 TableCell components', () => {
    expect(tableRow.find(TableCell)).to.have.length(4);
  })

  const tableBody = table.find(TableBody);

  it('should contain a TableBody component', () => {
    expect(tableBody).to.have.length(1);
  })

  it('should contain 4 TableRow components', () => {
    expect(tableBody.find(TableRow)).to.have.length(4);
  })

  it('should contain a TablePagination component', () => {
    expect(paper.find(TablePagination)).to.have.length(1);
  })
})*/
})