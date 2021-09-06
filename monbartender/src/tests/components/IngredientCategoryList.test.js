import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import IngredientCategoryList from '../../components/ingredientCategoryList/IngredientCategoryList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

//const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
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

  /*describe('it tests case if listeCategoriesIngredients is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      accessToken: testAccessToken,
      listeCategoriesIngredients: undefined,
      setListeCategoriesIngredients: jest.fn(),
    }));

    const ingredientCategoryList = shallow(<IngredientCategoryList />);

    it('should contain a LoadingMessage component', () => {
      expect(ingredientCategoryList.find(LoadingMessage)).to.have.length(1);
      expect(ingredientCategoryList.find(Paper)).to.have.length(0);
    })
  })*/

  // describe('it tests case if listeCategoriesIngredients is defined', () => {
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    //accessToken: testAccessToken,
    listeCategoriesIngredients: testListCategoriesIngredients,
    //setListeCategoriesIngredients: jest.fn(),
  }));

  const categoriesList = shallow(<IngredientCategoryList />);
  // const categoryBoard = ingredientCategoryList.find(Paper);

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
  /*it('should contain a Paper component witch className="category-board"', () => {
    expect(categoryBoard).to.have.length(1);
    expect(categoryBoard.props()).to.have.property('className', 'category-board');
  })

  const tableContainer = categoryBoard.find(TableContainer);

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

  it('should contain 3 TableCell components', () => {
    expect(tableRow.find(TableCell)).to.have.length(3);
  })

  const tableBody = table.find(TableBody);

  it('should contain a TableBody component', () => {
    expect(tableBody).to.have.length(1);
  })

  it('should contain 5 TableRow components', () => {
    expect(tableBody.find(TableRow)).to.have.length(5);
  })

  it('should contain a TablePagination component', () => {
    expect(categoryBoard.find(TablePagination)).to.have.length(1);
  })*/
  // })
})