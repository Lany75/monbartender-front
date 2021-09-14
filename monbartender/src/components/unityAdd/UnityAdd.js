import React from 'react';
import Axios from "axios";
import { TextField, Button } from '@material-ui/core';

import apiBaseURL from "../../env";

import { IngredientContext } from '../../context/ingredientContext';
import { AuthContext } from '../../context/authContext';
import './UnityAdd.css';

const UnityAdd = ({ setMessage }) => {
  const { accessToken } = React.useContext(AuthContext);
  const { unitiesList, setUnitiesList } = React.useContext(IngredientContext);
  const [unityName, setUnityName] = React.useState('');

  const addUnity = event => {
    event.preventDefault();
    const name = unityName.replace(/\s+/g, ' ').trim();

    if (
      !(/\S/.test(name) &&
        name.length >= 1 &&
        name.length <= 30)
    ) setMessage('Le nom doit avoir entre 1 et 30 caractères');
    else {
      if (
        unitiesList.findIndex(unite => unite.nom === name) !== -1
      ) setMessage('Cette unité existe déja');
      else {
        setMessage('');
        Axios.post(`${apiBaseURL}/api/v2/unities`,
          { nom: name },
          {
            headers: {
              authorization: accessToken
            }
          })
          .then(reponse => {
            setUnitiesList(reponse.data);
            setUnityName('');
          })
          .catch(error => {
            console.log("vous avez une erreur : ", error);
          });
      }
    }
  }

  return (
    <form className='form-unity-add' onSubmit={addUnity}>
      <div id='unity-add-name'>
        <TextField
          variant='outlined'
          margin='normal'
          label='Nouvelle unité'
          name='unityName'
          value={unityName}
          onChange={event => setUnityName(event.target.value)}
          required
        />
      </div>
      <div id='unity-add-btn'>
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

export default UnityAdd;