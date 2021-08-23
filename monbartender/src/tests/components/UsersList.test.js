import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import UsersList from '../../components/usersList/UsersList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

const testUsers = [
  {
    droits: false,
    id: "26081c58-67f4-4e68-8909-4bb9b0547477",
    personneId: "lany.p75@gmail.com"
  },
  {
    droits: false,
    id: "32676503-81a2-4e2c-a32b-b76d78c03ea2",
    personneId: "meli.melo@mail.com"
  },
  {
    droits: true,
    id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
    personneId: "mlanie.parry@gmail.com",
  }
]

describe('<UsersList />', () => {

  describe('it tests case if users props is undefined', () => {
    const usersList = shallow(<UsersList />);

    it('should contain a LoadingMessage component', () => {
      expect(usersList.find(LoadingMessage)).to.have.length(1);
      expect(usersList.find(Paper)).to.have.length(0);
    })
  })

  describe('it tests case if users props is defined', () => {
    const usersList = shallow(<UsersList users={testUsers} />);
    const usersBoard = usersList.find(Paper);

    it('should contain a Paper component witch className="users-board"', () => {
      expect(usersBoard).to.have.length(1);
      expect(usersBoard.props()).to.have.property('className', 'users-board');
    })

    const tableContainer = usersBoard.find(TableContainer);

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

    it('should contain 3 TableRow components', () => {
      expect(tableBody.find(TableRow)).to.have.length(3);
    })

    it('should contain a TablePagination component', () => {
      expect(usersBoard.find(TablePagination)).to.have.length(1);
    })
  })
})