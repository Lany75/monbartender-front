import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';

import UsersList from '../../components/usersList/UsersList';
import LoadingMessage from '../../components/loadingMessage/LoadingMessage';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
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
];
const connectedUser = {
  displayName: "Mélanie PARRY",
  email: "mlanie.parry@gmail.com"
};

describe('<UsersList />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });
  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    user: connectedUser,
    accessToken: testAccessToken
  }));

  describe('it tests case if users props is undefined', () => {
    const usersList = shallow(<UsersList />);

    it('should contain a LoadingMessage component', () => {
      expect(usersList.find(LoadingMessage)).to.have.length(1);
      expect(usersList.find(Paper)).to.have.length(0);
    })
  })

  describe('it tests case if users props is defined', () => {
    const usersList = shallow(<UsersList users={testUsers} setUsers={jest.fn()} />);
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