import React from 'react'
import { expect } from 'chai';
import { shallow } from 'enzyme';
import AuthButton from '../../components/authButton/AuthButton';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const testUser = {
  displayName: "Mélanie PARRY",
  email: "mlanie.parry@gmail.com"
};
const testUserBar = {
  id: "aabdd6c6-9209-4ff0-8c3b-fc3829444e20",
  personneId: "mlanie.parry@gmail.com",
  droits: true,
  Ingredients: [],
};

describe('<AuthButton />', () => {
  let realUseContext;
  beforeEach(() => {
    realUseContext = React.useContext;
  });

  afterEach(() => {
    React.useContext = realUseContext;
  });

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    user: testUser,
    setAccessToken: jest.fn(),
    signOut: jest.fn(),
    bar: testUserBar,
    setBar: jest.fn()
  }));

  const authButton1 = shallow(<AuthButton />);

  jest.spyOn(React, 'useContext').mockImplementation(() => ({
    user: undefined,
    setAccessToken: jest.fn(),
    signOut: jest.fn(),
    bar: undefined,
    setBar: jest.fn()
  }));

  const authButton2 = shallow(<AuthButton />);

  const divAuthButton1 = authButton1.find('div.auth-button');
  const divAuthButton2 = authButton2.find('div.auth-button');

  it('should contain a div witch className is auth-button', () => {
    expect(divAuthButton1).to.have.length(1);
    expect(divAuthButton2).to.have.length(1);
  })

  const iconButton1 = divAuthButton1.find(IconButton);
  const iconButton2 = divAuthButton2.find(IconButton);

  it('should contain an IconButton component with an onClick function', () => {
    expect(iconButton1).to.have.length(1);
    expect(typeof (iconButton1.props().onClick)).to.equal('function');

    expect(iconButton2).to.have.length(1);
    expect(typeof (iconButton2.props().onClick)).to.equal('function');
  })

  it('should contain only an AccountCircle component if user is undefined', () => {
    expect(iconButton2.find(AccountCircle)).to.have.length(1);
    expect(iconButton2.find('div.auth-name')).to.have.length(0);
  })

  it('should contain an AccountCircle component and a div witch className="auth-name" and text="Mélanie" if user is defined', () => {
    expect(iconButton1.find(AccountCircle)).to.have.length(1);
    expect(iconButton1.find('div.auth-name')).to.have.length(1);
    expect(iconButton1.find('div.auth-name').text()).to.be.equal('Mélanie');
  })

  const menu1 = divAuthButton1.find(Menu);
  const menu2 = divAuthButton2.find(Menu);

  it('should contain a Menu component with an onClose function', () => {
    expect(menu1).to.have.length(1);
    expect(typeof (menu1.props().onClose)).to.equal('function');

    expect(menu2).to.have.length(1);
    expect(typeof (menu2.props().onClose)).to.equal('function');
  })

  describe('if user is defined', () => {
    const userMenu = menu1.find('div.user-menu');

    it('should contain a div witch className="user-menu"', () => {
      expect(userMenu).to.have.length(1);
    })

    it('should contain 5 MenuItem components with onClick function', () => {
      expect(userMenu.find(MenuItem)).to.have.length(5);
      userMenu.find(MenuItem).forEach(mi => {
        expect(typeof (mi.props().onClick)).to.equal('function');
      })
    })
  })

  describe('if user is undefined', () => {
    const visitorMenu = menu2.find('div.visitor-menu');

    it('should contain a div witch className="visitor-menu"', () => {
      expect(visitorMenu).to.have.length(1);
    })

    it('should contain 2 MenuItem components with onClick function', () => {
      expect(visitorMenu.find(MenuItem)).to.have.length(2);
      visitorMenu.find(MenuItem).forEach(mi => {
        expect(typeof (mi.props().onClick)).to.equal('function');
      })
    })
  })
})