import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';
import GlassChange from '../../components/glassChange/GlassChange';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';
const testglass = {
  id: "351efe5d-c697-4e1a-a47c-ad555a800ed3",
  nom: "Chope"
}

describe('<GlassChange />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    accessToken: testAccessToken,
    setListeVerres: jest.fn(),
  }));

  const glassChange1 = shallow(<GlassChange />);
  const glassChange2 = shallow(<GlassChange glass={testglass} />);

  const divGlassChange1 = glassChange1.find('div.glass-change');
  const divGlassChange2 = glassChange2.find('div.glass-change');

  it('should contain a div witch className="glass-change"', () => {
    expect(divGlassChange1).to.have.length(1);
    expect(divGlassChange2).to.have.length(1);
  })

  it("should contain a h4 tag witch text is 'MODIFICATION D'UN VERRE'", () => {
    expect(divGlassChange1.find('h4')).to.have.length(1);
    expect(divGlassChange1.find('h4').text()).to.be.equal("MODIFICATION D'UN VERRE");

    expect(divGlassChange2.find('h4')).to.have.length(1);
    expect(divGlassChange2.find('h4').text()).to.be.equal("MODIFICATION D'UN VERRE");
  })

  const form1 = divGlassChange1.find('form.form-glass-change');
  const form2 = divGlassChange2.find('form.form-glass-change');

  it('should contain a form tag witch className="form-glass-change" and have onSubmit attribute', () => {
    expect(form1).to.have.length(1);
    expect(typeof (form1.props().onSubmit)).to.equal('function');

    expect(form2).to.have.length(1);
    expect(typeof (form2.props().onSubmit)).to.equal('function');
  })

  it('should contain a p tag witch id="glass-id" and with text "Cliquer dans le tableau sur le verre à modifier" if glass prop is undefined', () => {
    expect(form1.find('p#glass-id')).to.have.length(1);
    expect(form1.find('p#glass-id').text()).to.be.equal('Cliquer dans le tableau sur le verre à modifier');
  })

  it('should contain a p tag witch id="glass-id" and with text "id: 351efe5d-c697-4e1a-a47c-ad555a800ed3" if glass prop is defined', () => {
    expect(form2.find('p#glass-id')).to.have.length(1);
    expect(form2.find('p#glass-id').text()).to.be.equal('id: 351efe5d-c697-4e1a-a47c-ad555a800ed3');
  })

  const divGlassName1 = form1.find('div#glass-name');
  const divGlassName2 = form2.find('div#glass-name');

  it('should contain a div witch id="glass-name"', () => {
    expect(divGlassName1).to.have.length(1);
    expect(divGlassName2).to.have.length(1);
  })

  it('should contain a TextField component witch have name, label and onChange attributes', () => {
    const textField1 = divGlassName1.find(TextField);
    expect(textField1).to.have.length(1);
    expect(textField1.props()).to.have.property('label', 'Nom');
    expect(textField1.props()).to.have.property('name', 'glassName');
    expect(typeof (textField1.props().onChange)).to.equal('function');

    const textField2 = divGlassName1.find(TextField);
    expect(textField2).to.have.length(1);
    expect(textField2.props()).to.have.property('label', 'Nom');
    expect(textField2.props()).to.have.property('name', 'glassName');
    expect(typeof (textField2.props().onChange)).to.equal('function');
  })

  const btnModify1 = form1.find('div#glass-change-btn-modify');
  const btnModify2 = form2.find('div#glass-change-btn-modify');

  it('should contain a div witch id="glass-change-btn-modify"', () => {
    expect(btnModify1).to.have.length(1);
    expect(btnModify2).to.have.length(1);
  })

  it('should contain a submit Button with text="Modifier"', () => {
    expect(btnModify1.find(Button)).to.have.length(1);
    expect(btnModify1.find(Button).props()).to.have.property('type', 'submit');
    expect(btnModify1.find(Button).text()).to.be.equal('Modifier');

    expect(btnModify2.find(Button)).to.have.length(1);
    expect(btnModify2.find(Button).props()).to.have.property('type', 'submit');
    expect(btnModify2.find(Button).text()).to.be.equal('Modifier');
  })
})