import React, { useState } from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { VerreContext } from '../../context/verreContext';
import { AuthContext } from '../../context/authContext';
import './GlassAdd.css';

import camelCaseText from '../../utils/cameCaseText';

const GlassAdd = ({ setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { listeVerres, setListeVerres } = React.useContext(VerreContext);
  const [glassName, setGlassName] = useState('');

  const addGlass = event => {
    event.preventDefault();
    const name = glassName.replace(/\s+/g, ' ').trim();

    if (
      !(/\S/.test(name) &&
        name.length >= 2 &&
        name.length <= 30)
    ) setMessage('Le nom doit avoir entre 2 et 30 caractères');
    else {
      if (
        listeVerres.findIndex(verre => verre.nom === camelCaseText(name)) !== -1
      ) setMessage('Ce verre existe déja');
      else {
        setMessage('');
        Axios.post(`${apiBaseURL}/api/v2/glasses`,
          { nom: name },
          {
            headers: {
              authorization: accessToken
            }
          })
          .then(reponse => {
            setListeVerres(reponse.data);
            setGlassName('');
          })
          .catch(error => {
            console.log("vous avez une erreur : ", error);
          });
      }
    }
  }

  return (
    <form className='form-glass-add' onSubmit={addGlass}>
      <div id='glass-add-name'>
        <TextField
          variant='outlined'
          margin='normal'
          label='Nouveau verre'
          name='glassName'
          value={glassName}
          onChange={event => setGlassName(event.target.value)}
        />
      </div>
      <div id='glass-add-btn'>
        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          +
        </Button>
      </div>
    </form>
  )
}

export default GlassAdd;