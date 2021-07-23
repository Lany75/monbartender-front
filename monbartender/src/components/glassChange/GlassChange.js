import React, { useEffect, useState } from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { VerreContext } from '../../context/verreContext';
import { AuthContext } from '../../context/authContext';

import './GlassChange.css';

const GlassChange = ({ glass, setGlass }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { setListeVerres } = React.useContext(VerreContext);
  const [glassId, setGlassId] = useState('');
  const [glassName, setGlassName] = useState('');

  const modifyGlass = event => {
    event.preventDefault();

    if (glassId !== '' && glassName !== '') {
      Axios.put(`${apiBaseURL}/api/v2/glasses/${glassId}`,
        { nom: glassName },
        {
          headers: {
            authorization: accessToken
          }
        })
        .then(reponse => {
          setListeVerres(reponse.data);
          setGlass(null);
        })
        .catch(error => {
          console.log("vous avez une erreur : ", error);
        });
    }
  }

  useEffect(() => {
    if (glass) {
      setGlassId(glass.id);
      setGlassName(glass.nom);
    } else {
      setGlassId('');
      setGlassName('');
    }
  }, [glass])

  return (
    <div className='glass-change'>
      <h4>MODIFICATION D'UN VERRE</h4>
      <form className='form-glass-change' onSubmit={modifyGlass}>
        {glass ? (
          <p id='glass-id'>id: {glass?.id}</p>
        ) : (
          <p id='glass-id'>Cliquer dans le tableau sur le verre à modifier</p>
        )}
        <div id='glass-name'>
          <TextField
            variant='outlined'
            margin='normal'
            label='Nom'
            name='glassName'
            value={glassName}
            onChange={event => setGlassName(event.target.value)}
          />
        </div>
        <div id='glass-change-btn-modify'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            Modifier
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GlassChange;