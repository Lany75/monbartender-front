import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Button, TextField } from '@material-ui/core';
import GlassAdd from '../../components/glassAdd/GlassAdd';

const testAccessToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjhiMjFkNWE1Y2U2OGM1MjNlZTc0MzI5YjQ3ZDg0NGE3YmZjODRjZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTcOpbGFuaWUgUEFSUlkiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1rcXhaSklwaThKNC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BS0YwNW5Cb0tWRnBFaVVaY1JoTXpkYUVIWWJPbXBQUjN3L3Bob3RvLmpwZyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb25iYXJ0ZW5kZXIiLCJhdWQiOiJtb25iYXJ0ZW5kZXIiLCJhdXRoX3RpbWUiOjE2MjUwNjUwMzgsInVzZXJfaWQiOiJGTWRZSVFUb09pZTNmUjdNMDdSMXNjRm52SXcyIiwic3ViIjoiRk1kWUlRVG9PaWUzZlI3TTA3UjFzY0Zudkl3MiIsImlhdCI6MTYyNTEzODY4OCwiZXhwIjoxNjI1MTQyMjg4LCJlbWFpbCI6Im1sYW5pZS5wYXJyeUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNzMwMTM4MjY5NjkwOTY5Njc4MSJdLCJlbWFpbCI6WyJtbGFuaWUucGFycnlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.Dki9I0nDE4b7kH5UbrDyhR6QEJXrCAP-c9crSZK7WQ6caTkeHMpKkHi_644CERig8wYdpsZbmGJI7eplKEfXq4GyQtdJqrpNNPcHkxl6-3KYZuSbg-G3oFbwGRo2dP6J2ARU9L-I3CHusBLas9c508HqZjwf5kwzzTzN7e7K93Ear31eAmpdxYrQm6Sfpm_llRUd3HW5lKpGSWRZc5JMcLRZ6jv1m_XWLqPWu5s0-wjYquRxcZLIwc2hm1kDJGoxk2TQnTKgRpDabgIREFcvriEkHD0yVODkgcOkanM6UgaPLU7x6Rg4vKi8FOITFuPxpeIFl_oxPcj0IwDVHzxwWg';

describe('<GlassAdd />', () => {
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

  const glassAdd = shallow(<GlassAdd />);
  const divGlassAdd = glassAdd.find('div.glass-add');

  it('should contain a div witch className="glass-add"', () => {
    expect(divGlassAdd).to.have.length(1);
  })

  it("should contain a h4 tag witch text is 'AJOUT D'UN VERRE'", () => {
    expect(divGlassAdd.find('h4')).to.have.length(1);
    expect(divGlassAdd.find('h4').text()).to.be.equal("AJOUT D'UN VERRE");
  })

  const form = divGlassAdd.find('form.form-glass-add');

  it('should contain a form tag witch className="form-glass-change" and have onSubmit attribute', () => {
    expect(form).to.have.length(1);
    expect(form.props()).to.have.property('onSubmit');
  })

  const divGlassAddName = form.find('div#glass-add-name');

  it('should contain a div witch id="glass-add-name"', () => {
    expect(divGlassAddName).to.have.length(1);
  })

  it('should contain a TextField component witch have name, label and onChange attributes', () => {
    const textField = divGlassAddName.find(TextField);
    expect(textField).to.have.length(1);
    expect(textField.props()).to.have.property('label', 'Nom');
    expect(textField.props()).to.have.property('name', 'glassName');
    expect(textField.props()).to.have.property('onChange');
  })

  const btnAdd = form.find('div#glass-add-btn');

  it('should contain a div witch id="glass-add-btn"', () => {
    expect(btnAdd).to.have.length(1);
  })

  it('should contain a submit Button with text="Ajouter"', () => {
    expect(btnAdd.find(Button)).to.have.length(1);
    expect(btnAdd.find(Button).props()).to.have.property('type', 'submit');
    expect(btnAdd.find(Button).text()).to.be.equal('Ajouter');
  })
})
