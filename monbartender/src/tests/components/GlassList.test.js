import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import GlassList from '../../components/glassList/GlassList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

const testListVerres = [
  {
    id: "351efe5d-c697-4e1a-a47c-ad555a800ed3",
    nom: "Chope"
  },
  {
    id: "aac971dd-7329-4579-88e7-8ca7a7c0b026",
    nom: "Flute"
  },
  {
    id: "0ec43307-8523-48c6-8fd9-06be72e484bd",
    nom: "Tumbler"
  },
  {
    id: "c69758d1-b4ad-4038-b157-205fd12d9ace",
    nom: "Verre à Cocktail"
  }
];

describe('<GlassList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  describe('it test case if listeVerres is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeVerres: undefined,
    }));

    const glassList = shallow(<GlassList />);

    it('should contain a LoadingMessage component', () => {
      expect(glassList.find(LoadingMessage)).to.have.length(1);
      expect(glassList.find(Paper)).to.have.length(0);
    })
  })

  describe('it test case if listeVerres is defined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      listeVerres: testListVerres,
    }));

    const glassList = shallow(<GlassList />);
    const glassBoard = glassList.find(Paper);

    it('should contain a Paper component witch className="glass-board"', () => {
      expect(glassBoard).to.have.length(1);
      expect(glassBoard.props()).to.have.property('className', 'glass-board');
    })

    const tableContainer = glassBoard.find(TableContainer);

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
      expect(glassBoard.find(TablePagination)).to.have.length(1);
    })
  })
})