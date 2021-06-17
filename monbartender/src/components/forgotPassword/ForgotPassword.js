import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import firebaseAppAuth from '../../firebaseConfig';

import './ForgotPassword.css';
import './ForgotPasswordDesktop.css';

const ForgotPassword = () => {
  let history = useHistory();
  const [message, setMessage] = useState('');
  const [mail, setMail] = useState('');

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await firebaseAppAuth.sendPasswordResetEmail(mail)
        .then(() => {
          setMessage('Email envoyé, vous allez être redirigé vers la page de connexion');
          setTimeout(function () { history.push('/connexion'); }, 5000);
        })
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setMessage(`Aucun compte lié à l'adresse mail ${mail}`)
          break;
        case 'auth/invalid-email':
          setMessage(`L'adresse mail ${mail} n'est pas valide`);
          break;
        default:
          console.log(error.message);
          break;
      }
    }
  }

  return (
    <>
      <div className='password-message'>{message}</div>
      <Container component="main" maxWidth="xs">
        <div className='password'>
          <Typography component="h1" variant="h5">
            Réinitialisation du mot de passe
          </Typography>
          <form className='password-form' onSubmit={onSubmit}>
            <TextField
              className='password-input'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password-email"
              label="Adresse email du compte"
              name="passwordEmail"
              autoComplete="email"
              autoFocus
              onChange={event => setMail(event.target.value)}
            />
            <div className='password-button'>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Réinitialiser le mot de passe
              </Button>
            </div>
          </form>
        </div>
      </Container >
    </>
  )
}

export default ForgotPassword;