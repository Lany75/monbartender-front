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

  describe('it test case if user is defined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      user: testUser,
      setAccessToken: jest.fn(),
      signOut: jest.fn(),
      bar: testUserBar,
      setBar: jest.fn()
    }));

    const authButton = shallow(<AuthButton />);
    const divAuthButton = authButton.find('div.auth-button')

    it('should contain a div witch className is auth-button', () => {
      expect(divAuthButton).to.have.length(1);
    })

    const iconButton = divAuthButton.find(IconButton);

    it('should contain an IconButton component with an onClick function', () => {
      expect(iconButton).to.have.length(1);
      expect(typeof (iconButton.props().onClick)).to.equal('function');
    })

    it('should contain an AccountCircle component', () => {
      expect(iconButton.find(AccountCircle)).to.have.length(1);
    })

    it('should contain a div witch className="auth-name" and text="Mélanie"', () => {
      expect(iconButton.find('div.auth-name')).to.have.length(1);
      expect(iconButton.find('div.auth-name').text()).to.be.equal('Mélanie');
    })

    const menu = divAuthButton.find(Menu);

    it('should contain a Menu component with an onClose function', () => {
      expect(menu).to.have.length(1);
      expect(typeof (menu.props().onClose)).to.equal('function');
    })

    const userMenu = menu.find('div.user-menu');

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


  describe('it test case if user is undefined', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      user: undefined,
      setAccessToken: jest.fn(),
      signOut: jest.fn(),
      bar: undefined,
      setBar: jest.fn()
    }));

    const authButton = shallow(<AuthButton />);
    const divAuthButton = authButton.find('div.auth-button')

    it('should contain a div witch className is auth-button', () => {
      expect(divAuthButton).to.have.length(1);
    })

    const iconButton = divAuthButton.find(IconButton);

    it('should contain an IconButton component with an onClick function', () => {
      expect(iconButton).to.have.length(1);
      expect(typeof (iconButton.props().onClick)).to.equal('function');
    })

    it('should contain an AccountCircle component', () => {
      expect(iconButton.find(AccountCircle)).to.have.length(1);
    })

    const menu = divAuthButton.find(Menu);

    it('should contain a Menu component with an onClose function', () => {
      expect(menu).to.have.length(1);
      expect(typeof (menu.props().onClose)).to.equal('function');
    })

    const visitorMenu = menu.find('div.visitor-menu');

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