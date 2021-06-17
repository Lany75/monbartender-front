import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import MenuButton from '../../components/menuButton/MenuButton';


describe('<MenuButton />', () => {

  const menuButton = shallow(<MenuButton />);

  it('should contain a div witch className is menu', () => {
    expect(menuButton.find('.menu')).to.have.length(1);
  })

  it('should contain an IconButton component', () => {
    expect(menuButton.find(IconButton)).to.have.length(1);
  })

  it('The IconButton component should contain a MenuIcon component', () => {
    const iconButton = menuButton.find(IconButton);
    expect(iconButton.find(MenuIcon)).to.have.length(1);
  })

  it('should contain a Menu component', () => {
    expect(menuButton.find(Menu)).to.have.length(1);
  })

  it('The Menu component should contain 3 MenuItem components', () => {
    const menu = menuButton.find(Menu);
    expect(menu.find(MenuItem)).to.have.length(3);
  })

  it('Every MenuItem component should have an onClick function ', () => {
    const menu = menuButton.find(Menu);
    const menuItem = menu.find(MenuItem);
    menuItem.map(mi => {
      expect(typeof (mi.props().onClick)).to.equal('function');
    })
  })
})