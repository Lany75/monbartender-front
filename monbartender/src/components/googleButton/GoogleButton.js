import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import googleLogo from '../../assets/logo-google-25.png';
import './GoogleButton.css';
import { AuthContext } from '../../context/authContext';

const ButtonGoogleConnect = ({ text }) => {
  let history = useHistory();
  const { signInWithGoogle } = useContext(AuthContext);

  const googleConnect = async event => {
    event.preventDefault();
    try {
      await signInWithGoogle();
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