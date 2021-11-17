import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import DialogAddNewGlass from '../../components/dialogAddNewGlass/DialogAddNewGlass';
import DialogErrorMessage from '../../components/dialogErrorMessage/DialogErrorMessage';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';

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

describe('<DialogAddNewGlass />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    listeVerres: testListVerres,
    setListeVerres: jest.fn(),
    accessToken: testAccessToken,
  }));

  const dialogAddNewGlass = shallow(<DialogAddNewGlass />);
  const dialog = dialogAddNewGlass.find(Dialog);

  it('should contain a Dialog component with open and onClose attributes', () => {
    expect(dialog).to.have.length(1);
    expect(dialog.props()).to.have.property('open');
    expect(dialog.props()).to.have.property('onClose');
  })

  const dialogTitle = dialog.find(DialogTitle);

  it('should contain a DialogTitle component with id="form-dialog-title" and text="Ajout d\'un nouveau verre"', () => {
    expect(dialogTitle).to.have.length(1);
    expect(dialogTitle.props()).to.have.property('id', 'form-dialog-title');
    expect(dialogTitle.text()).to.be.equal('Ajout d\'un nouveau verre');
  })

  const dialogContent = dialog.find(DialogContent);

  it('should contain a DialogContent component', () => {
    expect(dialogContent).to.have.length(1);
  })

  it('should contain a DialogContentText component with text="Indiquez le nom du verre"', () => {
    expect(dialogContent.find(DialogContentText)).to.have.length(1);
    expect(dialogContent.find(DialogContentText).text()).to.be.equal('Indiquez le nom du verre');
  })

  it('should contain a TextField component with value and onChange attribute', () => {
    const textField = dialogContent.find(TextField);

    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('value');
    expect(textField.props()).to.have.property('onChange');
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

  it('should contain a DialogErrorMessage component', () => {
    expect(dialogAddNewGlass.find(DialogErrorMessage)).to.have.length(1);
  })
})