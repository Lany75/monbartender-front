import React from 'react';
import { useHistory } from 'react-router-dom';
import * as firebase from 'firebase/app';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import firebaseAppAuth from '../../firebaseConfig';
import googleLogo from '../../assets/logo-google-25.png';
import './GoogleButton.css';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const ButtonGoogleConnect = ({ text }) => {
  let history = useHistory();

  const googleConnect = async event => {
    event.preventDefault();
    try {
      await firebaseAppAuth.signInWithPopup(googleProvider);
      history.push('/');
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className='connexion-google'>
        <Button variant="contained" color="primary" fullWidth onClick={googleConnect}>
          <img className='logo-google' alt='google icon' src={googleLogo}></img>
          {text}
        </Button>
      </div>
    </Container>
  )
}

export default ButtonGoogleConnect;