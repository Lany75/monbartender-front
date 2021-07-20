import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import IngredientCategoryList from '../../components/ingredientCategoryList/IngredientCategoryList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

const testListCategoriesIngredients = [
  {
    id: "66ca7575-284f-41f9-b468-7535be3a3c18",
    nom: "alcool"
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
    id: "8e6d7f82-95f6-40d4-ac30-9462a157b66e",
    nom: "liqueur"
  },
  {
    id: "69ee0fd7-1489-4873-b036-dfeb9744d2e2",
    nom: "sirop"
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

  describe('it test case if listeCategoriesIngredients is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeCategoriesIngredients: undefined,
    }));

    const ingredientCategoryList = shallow(<IngredientCategoryList />);

    it('should contain a LoadingMessage component', () => {
      expect(ingredientCategoryList.find(LoadingMessage)).to.have.length(1);
      expect(ingredientCategoryList.find(Paper)).to.have.length(0);
    })
  })

  describe('it test case if listeCategoriesIngredients is defined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeCategoriesIngredients: testListCategoriesIngredients,
    }));

    const ingredientCategoryList = shallow(<IngredientCategoryList />);
    const categoryBoard = ingredientCategoryList.find(Paper);

    it('should contain a Paper component witch className="category-board"', () => {
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
    })
  })
})