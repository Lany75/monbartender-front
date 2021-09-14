import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';
import UnityAdd from '../../components/unityAdd/UnityAdd';

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
    //accessToken: testAccessToken,
    unitiesList: unitiesListTest,
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