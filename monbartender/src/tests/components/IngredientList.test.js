import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import IngredientList from '../../components/ingredientList/IngredientList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

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

describe('<IngredientList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  describe('it test case if listeIngredients is defined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeIngredients: testListIngredients,
    }));

    const ingredientList = shallow(<IngredientList />);
    const paper = ingredientList.find(Paper);

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

    it('should contain 3 TableCell components', () => {
      expect(tableRow.find(TableCell)).to.have.length(3);
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
  })

  describe('it test case if listeIngredients is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeIngredients: undefined,
    }));

    const ingredientList = shallow(<IngredientList />);

    it('should contain a LoadingMessage component if listeIngredients is undefined', () => {
      expect(ingredientList.find(LoadingMessage)).to.have.length(1);
    })
  })
})