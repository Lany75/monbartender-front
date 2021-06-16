import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import firebaseAppAuth from '../../firebaseConfig';

import './SignUp.css';
import './SignUpDesktop.css';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

const SignUp = () => {
  const classes = useStyles();
  let history = useHistory();
  const [message, setMessage] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const onSignUp = async event => {
    event.preventDefault();
    if (password !== confirmPass) setMessage('Vous devez confirmer votre mot de passe')
    else {
      try {
        await firebaseAppAuth.createUserWithEmailAndPassword(mail, password)
          .then(() => {
            const user = firebaseAppAuth.currentUser;
            user.updateProfile({
              displayName: `${prenom} ${nom}`,
            })
          })
        history.push('/');
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setMessage(`Un compte existe déja avec l'adresse mail ${mail}`)
            break;
          case 'auth/invalid-email':
            setMessage(`L'adresse mail ${mail} n'est pas valide`);
            break;
          case 'auth/weak-password':
            setMessage('Le mot de passe doit contenir au moins 6 caractères');
            break;
          default:
            console.log(error.message);
            break;
        }
      }
    }
  }

  return (
    <>
      <div className='inscription-message'>{message}</div>
      <Container component="main" maxWidth="xs">
        <div className='inscription'>
          <Typography component="h1" variant="h5">
            Inscription
          </Typography>
          <form className='signup-form' onSubmit={onSignUp}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="inscription-nom"
                  label="Nom"
                  name="inscriptionNom"
                  autoComplete="nom"
                  autoFocus
                  onChange={event => setNom(event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="inscription-prenom"
                  label="Prénom"
                  name="inscriptionPrenom"
                  autoComplete="prenom"
                  onChange={event => setPrenom(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="inscription-email"
                  label="Adresse email"
                  name="inscriptionEmail"
                  autoComplete="email"
                  onChange={event => setMail(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="inscriptionPassword"
                  label="Mot de passe"
                  type="password"
                  id="inscription-password"
                  autoComplete="current-password"
                  onChange={event => setPassword(event.target.value)}
                />
              </Grid>
              {<Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirmez votre mot de passe"
                  type="password"
                  id="confirm-password"
                  autoComplete="confirm-password"
                  onChange={event => setConfirmPass(event.target.value)}
                />
              </Grid>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              S'inscrire
            </Button>
            <Grid container justify="flex-end">
              <Grid item className='yes-account'>
                Déja un compte? <Link
                  to='/connexion'
                >
                  Connexion
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  )
}

export default SignUp;