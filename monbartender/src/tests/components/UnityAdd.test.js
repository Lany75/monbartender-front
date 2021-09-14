import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';
import UnityAdd from '../../components/unityAdd/UnityAdd';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
const unitiesListTest = [
  {
    id: "e62f73e2-fa06-4f66-bc5a-47e349e1a6cd",
    nom: "cl"
  },
  {
    id: "0a02c041-235d-4382-892d-72b87ea000fa",
    nom: "feuille(s)"
  },
  {
    id: "0fee5a7d-fe97-47f9-bb5d-b9ea5cebd665",
    nom: "goutte(s)"
  },
  {
    id: "70a07305-7a87-48c2-97d9-db69b2b53953",
    nom: "gr"
  }
]

describe('<UnityAdd />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    unitiesList: unitiesListTest,
    setUnitiesList: jest.fn()
  }));

  const unityAdd = shallow(<UnityAdd />);
  const formUnityAdd = unityAdd.find('form.form-unity-add');

  it('should contain a form tag with className="form-unity-add" and onSubmit attribute', () => {
    expect(formUnityAdd).to.have.length(1);
    expect(formUnityAdd.props()).to.have.property('onSubmit');
  })

  const divUnityAddName = formUnityAdd.find('div#unity-add-name');

  it('should contain a div with id="unity-add-name"', () => {
    expect(divUnityAddName).to.have.length(1);
  })

  it('should contain a TextField component with name, label and onChange attributes', () => {
    const textField = divUnityAddName.find(TextField);
    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('label', 'Nouvelle unité');
    expect(textField.props()).to.have.property('name', 'unityName');
    expect(textField.props()).to.have.property('onChange');
  })

  const btnAdd = formUnityAdd.find('div#unity-add-btn');

  it('should contain a div witch id="unity-add-btn"', () => {
    expect(btnAdd).to.have.length(1);
  })

  it('should contain a submit Button with text="+"', () => {
    expect(btnAdd.find(Button)).to.have.length(1);
    expect(btnAdd.find(Button).props()).to.have.property('type', 'submit');
    expect(btnAdd.find(Button).text()).to.be.equal('+');
  })
})