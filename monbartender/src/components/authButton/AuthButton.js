import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';

import './AuthButton.css';
import './AuthButtonDesktop.css';

const AuthButton = () => {
  let { user, setAccessToken, signOut } = useContext(AuthContext);
  const { bar, setBar } = useContext(BarContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const userName = user && (user.displayName.split(' '))[0];
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deconnexion = () => {
    signOut();
    setBar(null);
    setAccessToken(null);
    user = null;
    handleClose();
  }

  return (
    <div className='auth'>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
        {user && (
          <div className='auth-name'>{userName}</div>
        )}
      </IconButton>
      <Menu
        id="auth-appbar"
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {user ? (
          <div>
            <MenuItem onClick={handleClose}>Mon profil</MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to='/monbar'
                style={{ textDecoration: "none", color: "black" }}
              >
                Mon bar
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>Mes favoris</MenuItem>
            {bar && bar.droits === true && (
              <MenuItem onClick={handleClose}>
                <Link
                  to='/gestion'
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Gestion
                </Link>
              </MenuItem>
            )}
            <MenuItem onClick={deconnexion}>
              <Link
                to='/'
                style={{ textDecoration: "none", color: "black" }}
              >
                Déconnexion
              </Link>
            </MenuItem>
          </div>
        ) : (
          <div>
            <MenuItem onClick={handleClose}>

              <Link
                to='/inscription'
                style={{ textDecoration: "none", color: "black" }}
              >
                S'inscrire
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                to='/connexion'
                style={{ textDecoration: "none", color: "black" }}
              >
                Se connecter
              </Link>
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default AuthButton;