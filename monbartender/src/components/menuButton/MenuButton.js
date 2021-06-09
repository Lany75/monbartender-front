import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import './MenuButtonDesktop.css';
import { Link } from 'react-router-dom';

const MenuButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='menu'>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link
            to='/'
            style={{ textDecoration: "none", color: "black" }}
          >
            Cocktails du moment
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link
            to='/recettes'
            style={{ textDecoration: "none", color: "black" }}
          >
            Toutes les recettes
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>Recherche</MenuItem>

      </Menu>
    </div>
  )
}

export default MenuButton;