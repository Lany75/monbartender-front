import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import GoogleButton from '../googleButton/GoogleButton';
import { AuthContext } from '../../context/authContext';
import './SignIn.css';
import './SignInDesktop.css';

const SignIn = () => {
  const { signInWithEmailAndPassword } = React.useContext(AuthContext);
  let history = useHistory();
  const [message, setMessage] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async event => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(mail, password);
      history.push('/');
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setMessage(`Le compte lié à ${mail} n'existe pas`)
          break;
        case 'auth/wrong-password':
          setMessage(`Mauvais mot de passe`)
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
      <div className='connexion-message'>{message}</div>
      <Container component="main" maxWidth="xs">
        <div className='connexion'>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <form className='signin-form' onSubmit={onSignIn}>
            <TextField
              className='signin-input'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="connexion-email"
              label="Adresse email"
              name="connexionEmail"
              autoComplete="email"
              autoFocus
              onChange={event => setMail(event.target.value)}
            />
            <TextField
              className='signin-input'
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="connexionPassword"
              label="Mot de passe"
              type="password"
              id="connexion-password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <div className='signin-button'>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Se connecter
              </Button>
            </div>
            <Grid container>
              <Grid item xs className='forgot-pass'>
                Mot de passe oublié?
              </Grid>
              <Grid item className='no-account'>
                Pas de compte? <Link
                  to='/inscription'
                >
                  Inscription
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container >
      <GoogleButton text='Connexion Google' />
    </>
  );
}

export default SignIn;