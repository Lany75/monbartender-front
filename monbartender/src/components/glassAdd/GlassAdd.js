import React, { useState } from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { VerreContext } from '../../context/verreContext';
import { AuthContext } from '../../context/authContext';

import './GlassAdd.css';

const GlassAdd = () => {
  const { accessToken } = React.useContext(AuthContext);
  const { setListeVerres } = React.useContext(VerreContext);
  const [glassName, setGlassName] = useState('');

  const addGlass = event => {
    event.preventDefault();

    if (glassName !== '') {
      Axios.post(`${apiBaseURL}/api/v2/glasses`,
        { nom: glassName },
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