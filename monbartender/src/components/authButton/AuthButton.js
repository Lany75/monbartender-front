import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { BsPeopleCircle } from "react-icons/bs";

import { AuthContext } from '../../context/authContext';
import { BarContext } from '../../context/barContext';

import './AuthButton.css';
import './AuthButtonDesktop.css';

const AuthButton = () => {
  let { user, signOut, setAccessToken } = useContext(AuthContext);
  const { setBar } = useContext(BarContext);
  const userName = user ? (user.displayName.split(' '))[0] : 'Visiteur';

  let history = useHistory();

  const connexion = () => {
    history.push('/connexion');
  }

  const deconnexion = () => {
    signOut();
    setBar(null);
    setAccessToken(null);
    user = null;
    history.push("/");
  }

  return (
    <div className='auth'>
      <div className='auth-button' onClick={user ? deconnexion : connexion}><BsPeopleCircle /></div>
      <div className='auth-name'>{userName}</div>
    </div>)
}

export default AuthButton;